from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
from models import User,sms_verfy,db,marketr_details, UserRole,package,InstagramCredentials
import models
from routes.funtions import commen_func

user_bp = Blueprint('user', __name__)



@user_bp.route('/denger',methods=['GET'])
@login_required
def denger():
    return render_template('profile/dengerB.html',user=current_user)


@user_bp.route('/invoice')
@login_required
def user_invoice():
    pack= models.sale.query.filter_by(buyer_id=current_user.id).all()
    last_p=[p.to_invoice() for p in pack]
    return render_template('user/user-invoice.html',user=current_user,last_p=last_p)



@user_bp.route('/mail-compose')
@login_required
def mail_compose():
    return render_template('profile/mail-compose.html',user=current_user)


@user_bp.route('/user_directagent')
@login_required
def user_directagen():
    return render_template('profile/user-directagent.html',user=current_user)




@user_bp.route('/user_antigost')
@login_required
def user_antigost():
    return render_template('profile/user-antigost.html',user=current_user)



@user_bp.route('/user_autointeraction')
@login_required
def user_autointeraction():
    return render_template('profile/user-autointeraction.html',user=current_user)

@user_bp.route('/blog')
@login_required
def blog():
    return render_template('profile/blog.html',user=current_user)

@user_bp.route('/user_dashboard',methods=['get'])
@login_required
def dashboard():
    user = current_user
    details = marketr_details(user_id=user.id)
    db.session.add(details)
    print(user.pic_path)
    print(user.first_name)
    
    # Check Instagram connection status
    instagram_connected = InstagramCredentials.query.filter_by(user_id=user.id).first() is not None
    
    if user.role.value == 1:
        details = marketr_details.query.filter_by(user_id=user.id).first()
        return render_template('user/user_dashboard.html', user=user, details=details, instagram_connected=instagram_connected)
    else:
        return render_template('user/user_dashboard.html', user=user, instagram_connected=instagram_connected)

