from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
from models import User,sms_verfy,db,marketr_details, UserRole,package,InstagramCredentials
import models
from routes.funtions import commen_func

in_find = Blueprint('user_ai', __name__,url_prefix='/user_ai')


@in_find.route('/ai_user_sender')
@login_required
def sender():
    return render_template('user/user-sendtoaccont.html',user=current_user)
@in_find.route('/ai_user_finder')
@login_required
def finder():
    all_g = models.bot_finds.query.filter_by(user_id=current_user.id).all()

    grop_found = []
    g_j = []

    for item in all_g:
        # ✅ Safely parse user_found and clean it
        f_user_raw = item.user_found
        members = f_user_raw.split(',') if f_user_raw and ',' in f_user_raw else ([f_user_raw] if f_user_raw else [])
        members = [m.strip() for m in members if m.strip()]  # remove empty and whitespace entries

        # ✅ Update total_find based on cleaned user list
        item.total_find = len(members)
        models.db.session.add(item)

        # ✅ Use type_re only after update
        data = item.type_re()

        grop_found.append({
            'id': item.id,
            'name': data['g_name'],
            'members': members,
            'hour': commen_func.dateJ(data['u_date'], hours_ago_mode=1),
            'date': commen_func.dateJ(data['c_date'])
        })

        g_j.append({
            'id': item.id,
            "name": data['g_name'],
            "memberCount": len(members),
            "users": members,
            "createdAt": commen_func.dateJ(data['c_date']),
            "lastUpdate": commen_func.dateJ(data['u_date'], hours_ago_mode=1),
            "target": "تست",
            "type": "دستی",
        })

    # ✅ Commit changes to total_find for all items
    models.db.session.commit()

    return render_template('user/user-findaccont.html', user=current_user, g_j=g_j, grop_found=grop_found)
