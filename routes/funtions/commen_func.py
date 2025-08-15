from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
import models
import os
import jdatetime
from datetime import datetime

up_folder = 'static/uploads'

profiles_bp=Blueprint('prof',__name__,url_prefix='/prof')
pack_bp=Blueprint('pack',__name__,url_prefix='/pack')

def dateJ(gregorian_datetime, hours_ago_mode=0):
    if not gregorian_datetime:
        return ""

    try:
        if hours_ago_mode == 1:
            now = datetime.utcnow()
            diff = now - gregorian_datetime
            hours = int(diff.total_seconds() // 3600)
            return f"{hours} ساعت پیش"

        jdate = jdatetime.datetime.fromgregorian(datetime=gregorian_datetime)
        return jdate.strftime("%Y/%m/%d")

    except Exception as e:
        print("Error in dateJ:", e)
        return ""

def list_pack():
    packs=models.package.query.filter_by().all()
    listt = [i.to_dict2() for i in packs]
    return listt

def packname(id):
    pack=models.package.query.filter_by(id=id).first()
    return pack.pack_name
def check_role(user,stats):
    """
    0:admin
    1:user
    2:marketer
    3:mini_admin
    
    """
    if user.role.value==0:
        return 0
    elif user.role.value==1:
        return 1
    elif user.role.value==2:
        return 2
    elif user.role.value==3:
        return 3
    

def logger_c(e,f,user_id):
    log_dir = 'log'
    os.makedirs(log_dir, exist_ok=True)

        # Write to log file
    with open(os.path.join(log_dir, 'error_log.txt'), 'a', encoding='utf-8') as log_file:
        log_file.write(f"[{datetime.now()}] Error in /{f}__{user_id}: {str(e)}\n")

@profiles_bp.route('/profile',methods=['GET'])
@login_required
def profile():
    if current_user.role.value==1:
        detail=models.marketr_details.query.filter_by(id=current_user.id).first()
        return render_template('profile/profile.html',user=current_user,detail=detail)
    else:
        return render_template('profile/profile.html',user=current_user,detail=[])

# denger hostar

@profiles_bp.route('/edit',methods=['GET'])
@login_required
def edit_prof():
    details=''
    if current_user.role==models.UserRole.MARKETER:
        details=models.marketr_details.query.filter_by(id=current_user.id).first()
        return    render_template('profile/editprofile.html',user=current_user,details=details)
    else:
        return    render_template('profile/editprofile.html',user=current_user,details=details)

@pack_bp.route('/invoice',methods=['GET'])
@login_required
def invoicee():
    return render_template('invoice.html',user=current_user)