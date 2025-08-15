from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
from models import User,sms_verfy,db,sale,sale_way
import models
mail_bp=Blueprint('Mail',__name__,url_prefix='/mail')

@mail_bp.route('/index', methods=['GET'])
@login_required
def index_mail():
    # Only top-level tickets sent by the user (not replies)
    tikets = models.tiket.query.filter_by(user_id=current_user.id, parent_id=None).order_by(models.tiket.created_at.desc()).all()

    ticket_data = []
    for t in tikets:
        t.replies = t.replies.order_by(models.tiket.created_at.asc()).all()
        user = models.User.query.filter_by(id=t.user_id).first()
        ticket_data.append((t, user))

    return render_template('profile/mail.html', user=current_user, ticket_data=ticket_data)



@mail_bp.route('/ticket/<int:ticket_id>', methods=['GET'])
@login_required
def ticket_view_user(ticket_id):
    # Fetch the main ticket (must not be a reply itself)
    ticket = models.tiket.query.filter_by(id=ticket_id, parent_id=None).first()

  
    # Fetch sender info
    sender = User.query.get(ticket.user_id)
    # Fetch replies, sorted by creation date
    replies = models.tiket.query.filter_by(parent_id=ticket.id).order_by(models.tiket.created_at.asc()).all()

    return render_template(
        'profile/mail-read.html',
        ticket=ticket,
        ticket_user=sender,
        sender=sender,
        user=current_user,
        replies=replies
    )


@mail_bp.route('/compose')
@login_required
def compose_mail():
    return render_template('profile/mail-compose.html', user=current_user)
