from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, login_user,current_user

from random import randint
import requests
import models
api_login_bp=Blueprint('api_login',__name__,url_prefix='/api')
debug_line='-------------------------'
def read_secret_key():
    # with open('app/sms_api_key.txt', 'r') as file:
    #     return file.readline().strip().encode('utf-8')
        return 'uXLwxAIBh8QicXDpG6D9xJg652zjCgcqPAFUILMlhAjd7xtP'




def send_sms(mobile_number,otp_code):
    # API key
    api_key = read_secret_key()
 
    template_id = '399502'
    url = 'https://api.sms.ir/v1/send/verify'
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': api_key
    }
    data = {
        'mobile': mobile_number,
        'templateId': template_id,
        'parameters': [
            {'name': 'CODE', 'value': otp_code}
        ]
    }
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
    # if 200== 200:
        print('OTP sent successfully!',otp_code)
        return True
    else:
        print('Failed to send OTP.')
        return False









@api_login_bp.route('/delete_code',methods=['POST'])
def delete_code():
    phone = request.get_json().get('phone')
    
    user = models.User.query.filter_by(phone_number=phone).first()
    code = models.sms_verfy.query.filter_by(Tuser=user.id).first()
    models.db.session.remove(code)

@api_login_bp.route('/resend_check_code',methods=["POST"])
def re_send_code():
    phone = request.get_json().get('phone')
    user = models.User.query.filter_by(phone_number=phone).first()
    code = models.sms_verfy.query.filter_by(Tuser=user.id).first()
    models.db.session.remove(code)
    models.db.session.commit()
    
    if phone[0]=='0':
        Vcode=randint(100000, 999999)
        #send sms will take here
        print(debug_line,Vcode,debug_line)
        if user:
            print(debug_line,'user found',debug_line)

            code=models.sms_verfy(
                Tuser=user.id,
                code=Vcode
            )
            models.db.session.add(code)
            models.db.session.commit()
            return jsonify({'status':'1','user':'1'}),200
        else:
            return jsonify({'status':'0','user':'0'}),400
    else:
        return jsonify({'status':'0'}),300

@api_login_bp.route('/check_code',methods=["POST"])
def check_code():
    phone = request.get_json().get('phone')
    user_code = request.get_json().get('vcode')
    user = models.User.query.filter_by(phone_number=phone).first()
    # print(user.role,user_code)
    code = models.sms_verfy.query.filter_by(Tuser=user.id).first()
    # print(debug_line,'db code is:{}'.format(code.code),debug_line)
    # print(debug_line,'given code is:{}'.format(user_code),debug_line)
    if int(user_code)==code.code:
        # print(debug_line,'user gave currect code',debug_line)
        models.db.session.delete(code)
        models.db.session.commit()
        login_user(user)  # <--- Login user here
        print(debug_line, 'user logged in', debug_line)
        if user.role==models.UserRole.USER:
            return jsonify({"redirect_url": url_for('user.dashboard')}), 200
        elif user.role==models.UserRole.ADMIN:
            return jsonify({"redirect_url": url_for('admin.admin_dashboard')}),200
        elif user.role==models.UserRole.MARKETER:
            return jsonify({"redirect_url": "/marketer/dashbourd_m"}), 200
    
    else:
        print(debug_line,'user is fakeing it',debug_line)
        
        return jsonify({"":""}),400

@api_login_bp.route('/check_phone',methods=["POST"])
def check_phone():
    phone = request.get_json().get('phone')
    user = models.User.query.filter_by(phone_number=phone).first()

    if user!=None:
        print(debug_line,user,debug_line)
        unwanted_codes=models.sms_verfy.query.filter_by(Tuser=user.id).all()
        if unwanted_codes:
            models.sms_verfy.query.filter_by(Tuser=user.id).delete()
            models.db.session.commit()
        print(phone)

    print(debug_line,'no user else',debug_line)

    if phone[0]=='0':
        Vcode=randint(100000, 999999)
        #send sms will take here
        if user!= None:
            print(debug_line,user.id,debug_line)

            code=models.sms_verfy(
                Tuser=user.id,
                code=Vcode
            )
            models.db.session.add(code)
            models.db.session.commit()
            send_sms(phone,code.code)
            return jsonify({'status':'1','user':'1'}),200
        else:
            # print(debug_line,'user not found',debug_line)
            user =models.User(
                pic_path=r'../static/assets/img/users/base_user_img.png',
                phone_number=phone
            )
            models.db.session.add(user)
            models.db.session.commit()
            user_shop_card=models.shop_card(user_id=user.id)
            models.db.session.add(user_shop_card)
            models.db.session.commit()
            code=models.sms_verfy(
                Tuser=user.id,
                code=Vcode
            )
            models.db.session.add(code)
            models.db.session.commit()
            if not send_sms(phone,code.code):
                flash('شماره اشتباه است')
            return jsonify({'status':'1','user':'0'}),200
        
    else:
        return jsonify({'status':'0'}),300
    