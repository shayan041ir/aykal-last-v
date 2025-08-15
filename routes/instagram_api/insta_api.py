# insta_blueprint.py
import os, requests, logging
from datetime import datetime, timedelta
from flask import (
    Blueprint, request, redirect, url_for,
    current_app, flash, jsonify
)
from flask_login import current_user, login_required
from models import db, InstagramCredentials

insta_bp = Blueprint("insta", __name__, url_prefix="/insta_api")

# ------------------------------------------------------------------------------
# Configuration - Fill in your values here
# ------------------------------------------------------------------------------
FB_APP_ID = "1087534533418506"  # <= Fill in your Facebook App ID
FB_APP_SECRET = "fc761e7cc8f9707d9701cb871f5b3b03"  # <= Fill in your Facebook App Secret
IG_VERIFY_TOKEN = "my_secret_verify_trz"  # <= Fill in your webhook verification token

# ------------------------------------------------------------------------------
# 1️⃣  Login – redirect user to Instagram OAuth
# ------------------------------------------------------------------------------
@insta_bp.route("/login")
@login_required
def insta_login():
    return redirect("https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1087534533418506&redirect_uri=https://aykalapp.com/insta_api/insta_callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights")

# ------------------------------------------------------------------------------
# 2️⃣  Callback – exchange code ➜ tokens, fetch IG account, save to DB
# ------------------------------------------------------------------------------
@insta_bp.route("/insta_callback")
@login_required
def insta_callback():
    error = request.args.get("error")
    if error:
        flash(f"Facebook error: {error}", "danger")
        return redirect(url_for("dashboard"))

    code = request.args.get("code")
    if not code:
        flash("No code returned from Facebook!", "danger")
        return redirect(url_for("dashboard"))

    REDIRECT_URI = url_for("insta.insta_callback", _external=True, _scheme="https")

    # ---- Step 1: short-lived token ------------------------------------------
    token_url = "https://graph.facebook.com/v19.0/oauth/access_token"
    sl_params = {
        "client_id":     FB_APP_ID,
        "client_secret": FB_APP_SECRET,
        "redirect_uri":  REDIRECT_URI,
        "code":          code,
    }
    short_resp = requests.get(token_url, params=sl_params, timeout=15).json()
    short_token = short_resp.get("access_token")
    if not short_token:
        current_app.logger.error(f"Short-token error: {short_resp}")
        flash("Token exchange failed.", "danger")
        return redirect(url_for("dashboard"))

    # ---- Step 2: long-lived token -------------------------------------------
    ll_params = {
        "grant_type":      "fb_exchange_token",
        "client_id":       FB_APP_ID,
        "client_secret":   FB_APP_SECRET,
        "fb_exchange_token": short_token
    }
    long_resp = requests.get(token_url, params=ll_params, timeout=15).json()
    long_token = long_resp.get("access_token")

    # ---- Step 3: get user Pages ---------------------------------------------
    pages = requests.get(
        "https://graph.facebook.com/v19.0/me/accounts",
        params={"access_token": long_token},
        timeout=15
    ).json().get("data", [])

    ig_id           = None
    page_token      = None
    connected_page  = None

    for page in pages:
        detail = requests.get(
            f"https://graph.facebook.com/v19.0/{page['id']}",
            params={
                "fields": "instagram_business_account",
                "access_token": long_token
            },
            timeout=15
        ).json()

        if detail.get("instagram_business_account"):
            ig_id      = detail["instagram_business_account"]["id"]
            page_token = page["access_token"]
            connected_page = page["id"]
            break

    if not ig_id:
        flash("No Instagram Business account linked to any of your Pages.", "warning")
        return redirect(url_for("dashboard"))

    # ---- Step 4: save to DB -------------------------------------------------
    # Calculate token expiration (60 days from now)
    token_expires_at = datetime.utcnow() + timedelta(days=60)
    
    # Check if user already has Instagram credentials
    existing_creds = InstagramCredentials.query.filter_by(user_id=current_user.id).first()
    
    if existing_creds:
        # Update existing credentials
        existing_creds.ig_account_id = ig_id
        existing_creds.fb_page_id = connected_page
        existing_creds.page_access_token = page_token
        existing_creds.user_long_token = long_token
        existing_creds.token_expires_at = token_expires_at
    else:
        # Create new credentials
        new_creds = InstagramCredentials(
            user_id=current_user.id,
            ig_account_id=ig_id,
            fb_page_id=connected_page,
            page_access_token=page_token,
            user_long_token=long_token,
            token_expires_at=token_expires_at
        )
        db.session.add(new_creds)
    
    try:
        db.session.commit()
        flash("Instagram connected successfully ✔️", "success")
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Failed to save Instagram credentials: {e}")
        flash("Failed to save Instagram connection.", "danger")
    
    return redirect(url_for("dashboard"))

# ------------------------------------------------------------------------------
# 3️⃣  Webhook – verify + receive events
# ------------------------------------------------------------------------------
@insta_bp.route("/webhook", methods=["GET", "POST"])
def insta_webhook():
    # ---- Verify handshake ----------------------------------------------------
    if request.method == "GET":
        if request.args.get("hub.verify_token") == IG_VERIFY_TOKEN:
            return request.args.get("hub.challenge"), 200
        return "Verification token mismatch", 403

    # ---- Handle events -------------------------------------------------------
    data = request.get_json(force=True)
    current_app.logger.info(f"IG Webhook ⬇️  {data}")

    # Example: reply automatically to new comments
    handle_ig_event(data)

    return "EVENT_RECEIVED", 200

# ------------------------------------------------------------------------------
# Helper: reply to comment when you get the webhook
# ------------------------------------------------------------------------------
def handle_ig_event(payload):
    """Very simplified handler – extend as needed."""
    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            field = change.get("field")
            value = change.get("value", {})
            if field == "comments":
                comment_id = value.get("id")
                page_id    = entry.get("id")         # FB Page ID
                auto_reply_to_comment(page_id, comment_id)

def auto_reply_to_comment(page_id, comment_id):
    # Get credentials from database
    creds = InstagramCredentials.query.filter_by(fb_page_id=page_id).first()
    if not creds:
        current_app.logger.error(f"No credentials found for page {page_id}")
        return
        
    reply_url = f"https://graph.facebook.com/v19.0/{comment_id}/replies"
    try:
        response = requests.post(reply_url, json={
            "message": "Thanks for your comment! 😊"
        }, params={
            "access_token": creds.page_access_token
        }, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"Failed to reply to comment: {e}")
