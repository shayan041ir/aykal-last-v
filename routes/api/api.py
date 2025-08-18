from flask import Flask , Blueprint,render_template,redirect,url_for, request,jsonify
from flask_login import LoginManager, logout_user, current_user,login_required
import os
from models import User,db,UserRole,sale
import models
import jdatetime
import requests
import datetime
from collections import defaultdict
from routes.payment import payment
from routes.funtions import commen_func
from werkzeug.utils import secure_filename
def curect_enum_time(data):
    for i in models.pack_durtion:
        if str(i.value) == str(data):
            return i
    return models.pack_durtion.oneM

def admin_check(user):
    if user.role!=models.UserRole.ADMIN:
        return jsonify({'status':'erorr',
                    'massege':'ای پی شما ثبت شد هر گونه تلاش پیگرد قانونی دارد',
                    'user':f'{user.phone}'}),403

def get_bazaryab(stats=0):
    class userstats:
        def __init__(self,name=None,phone=None,prof=None,total=None,stats=None,date=None):
            self.name=name
            self.phone=phone
            self.total=total
            self.stats=stats
            self.prof=prof
            self.date=date
            
    selers=models.User.query.filter_by(role=UserRole.MARKETER).all()
    if stats==0:
        return selers

    elif stats == 1:
        sale_for_users = []

        sales = sale.query.filter_by(
            stats=models.sale_status.sucsses,
            way=models.sale_way.discount
        ).all()

        sales_by_seller = defaultdict(list)
        for s in sales:
            sales_by_seller[s.seller_id].append(s)

        for i in selers:
            user_sales = sales_by_seller.get(i.id, [])

            if user_sales:
                m = [0, 0]  # prof, total
                date = None

                for k in user_sales:
                    date = k.updated_at
                    m[0] += k.sale_price
                m[1] = m[0] * 0.15
            else:
                m = [0, 0]
                date = 0
            stat_val = 1 if i.discount_token != '' else 0
            current_user = userstats(
                name=i.first_name,
                phone=i.phone_number,
                date=date,
                prof=m[0],
                total=m[1],
                stats=stat_val
            )
            sale_for_users.append(current_user)

        return sale_for_users
s_url='http://54.36.68.41:5100' 
# s_url='http://127.0.0.1:5100' 
line='\n=======================---------===============================\n'
site_api=Blueprint('apis',__name__,url_prefix='/api')


@site_api.route('/anti_gost_append', methods=['POST'])
def append_ghost():
    try:
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phone")

        # Basic validation
        if not username or not password or not email or not phone:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400



       
        new_acount= models.anti_g(
                user_id=current_user.id,
                acount_name=username,
                acount_password=password,
                email=email
        ) 

        models.db.session.add(new_acount)
        models.db.session.commit()
   

        return jsonify({"status": "success", "message": "Form submitted successfully!"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500  
@site_api.route('/job', methods=['POST'])
def job():
    data = request.get_json()
    g_name = data.get('group_name')
    userid = data.get('userid')
    new_users = data.get('found_list')

    print(g_name, userid)

    if not new_users:
        return jsonify({'status': 'empty_input'}), 400

    # Get all user groups for this user
    all_groups = models.bot_finds.query.filter_by(user_id=userid).all()

    target_group = g_name
    for group in all_groups:
        if group.grop_name == g_name :
            target_group = group
            break

    if target_group:
        if target_group.user_found:
            existing = target_group.user_found.split(',')
            target_group.user_found = ','.join(existing + new_users)
        else:
            target_group.user_found = ','.join(new_users)
        target_group.total_find = len([x for x in target_group.user_found.split(',') if x.strip()])
        db.session.commit()
        print('updateed count count is:',target_group.total_find)
        return jsonify({'status': 'appended'}), 200
    else:
        return jsonify({'status': 'not_found'}), 404
    
@site_api.route('/del_src_g', methods=['POST'])
def del_src_g():
    try:
        data = request.get_json()
        g_id = data['g_id']
        target_g = models.bot_finds.query.filter_by(user_id=current_user.id, id=g_id).first()
        print(g_id)
        if target_g:
            models.db.session.delete(target_g)
            models.db.session.commit()
            return jsonify({'status': 'ok', 'message': 'deleted'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Group not found'}), 404

    except Exception as e:
        # Ensure log directory exists
        commen_func.logger_c(e,'api.py+-=del_src',current_user.id)
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500
   
@site_api.route('/src',methods=['POST'])
def src():
    print(s_url)
    data=request.get_json()
    method = data.get('method')
    target = data.get('target')
    group_name = data.get('groupName')
    user_count = data.get('userCount')
    # Find existing groups with the same base name or similar suffix
    user_g = models.bot_finds.query.filter_by(user_id=current_user.id, grop_name=group_name).first()

    if user_g :
        user_g.total_find+=int(user_count)
       
       
    else:
        group = models.bot_finds(
            total_find=user_count,
            user_id=current_user.id,
            grop_name=group_name
        )
        models.db.session.add(group)
        # If group already exists, rename with -=-1, -=-2, ...

    models.db.session.commit()

    # Optional debug print

    url=''
    if method=='hashtag' or  method=='location':
        url = '{}/htag'.format(s_url)
    if method=='post':
        url = '{}/linkdata'.format(s_url)
    if method=='post':
        url = '{}/linkdata'.format(s_url)
    if method=='page':
        url = '{}/get_prof_data'.format(s_url)
    data = {
        'user_id':current_user.id,
        'username': '',
        'userpass': '',
        'limit': user_count,
        'src':target,
        "group_name":group_name
    }
    print('data is:',data)
    if url !='':
        requests.post(url, json=data)
    else:
        print('method: ',method)
        commen_func.logger_c('wrong url','api/src',current_user.id)
    return jsonify({'data':'yes'}),200
@site_api.route('/verfiy', methods=['GET'])
@login_required
def verfiy():
    data=request.get_json()
    print(data)

    return render_template('verifye/verify-user.html')
@site_api.route('/zibal_buy', methods=['POST'])
@login_required
def zibal_buy():
    data = request.get_json()
    package_id = data.get('package_id')
    
    # Validate package
    package = models.package.query.filter_by(id=package_id).first()
    if not package:
        return jsonify({'error': 'بسته یافت نشد'}), 404

    # Create payment gateway object
    dergah = payment.Zibal(callback_url='https://aykalapp.com/payment/verify')

    # Generate order ID
    now = jdatetime.datetime.now()
    order_id = f"mkt_{current_user.phone_number}_{now.year}_{now.month}_{now.second}"

    # Send request to Zibal
    zibal_response = dergah.request(
        amount=package.price,
        order_id=order_id,
        mobile=current_user.phone_number,
        description=f'خرید بسته {package.pack_name}'
    )

    # Handle Zibal response
    if zibal_response.get('result') == 100:
        track_id = zibal_response['trackId']
        url = f'https://gateway.zibal.ir/start/{track_id}'
        print('Zibal payment URL:', url)
        return jsonify({'buy_url': url})
    else:
        error_msg = zibal_response.get('message', 'درخواست پرداخت با خطا مواجه شد')
        print('Zibal error:', zibal_response)
        return jsonify({'error': error_msg}), 400
def zibal_pay_up(price,description,user):     
    dergah = payment.Zibal(callback_url='https://aykalapp.com/payment/verify')  
    now = jdatetime.datetime.now()
    order_id = f"mkt_{user}_{now.year}_{now.month}_{now.second}"

    
    zibal_response = dergah.request(
        amount=price,
        order_id=order_id,
        mobile=user,
        description=description
    )

   
    if zibal_response.get('result') == 100:
        track_id = zibal_response['trackId']
        url = f'https://gateway.zibal.ir/start/{track_id}'
        print('Zibal payment URL:', url)
        return url
    else:
        print('Zibal error:', zibal_response)
        return 'e'



@site_api.route('/add_shop', methods=['POST'])
@login_required
def add_shop():
    data = request.get_json()
    package_id = data.get('package_id')

    if not package_id:
        return jsonify({'status': 'fail', 'message': 'package_id is required'}), 400

    pack = models.package.query.filter_by(id=package_id).first()
    if not pack:
        return jsonify({'status': 'fail', 'message': 'Package not found'}), 404

    shopcard = models.shop_card.query.filter_by(user_id=current_user.id).first()
    if not shopcard:
        return jsonify({'status': 'fail', 'message': 'Shop card not found'}), 404

    shopcard.pack_id = pack.id
    models.db.session.commit()

    return jsonify({'status': 'ok'}), 200



@site_api.route('/del_shop_cart',methods=['POST'])
@login_required
def del_shop_cart():
    shop_card=models.shop_card.query.filter_by(user_id=current_user.id).first()
    shop_card.pack_id=None
    models.db.session.commit()
    return redirect(url_for('payment.shop_card')),200


@site_api.route('/shop_cart_info',methods=['POST'])
@login_required
def shop_info():
    print(current_user.id)
    shop_card=models.shop_card.query.filter_by(user_id=current_user.id).first()
    if shop_card.pack_id:
        pack=models.package.query.filter_by(id=shop_card.pack_id).first()
        print(line,pack.shopcard(),line)
        return pack.to_dict(),200
    else:
        return jsonify({}),200


@site_api.route('/change_prof_data',methods=['POST'])
@login_required
def change_prof():
    
    user=current_user
    data = request.get_json()
    name = data.get('name')
    last_name=data.get('last_name')   
    card=data.get('card')   
    email=data.get('email')   
    if name:
        user.first_name=name 
    if last_name:
        user.last_name=last_name 
    db.session.commit()
    return jsonify({'stats':'1'}),200


@site_api.route('/convert_date', methods=['POST'])
def convert_date():

    data = request.get_json()
    dt = data.get('date')  # expects a string like "2025-04-30T14:00:00"
    if not dt:
        return jsonify({'error': 'No date given'}), 400
    try:
        # Parse string into Python datetime
        parsed_dt = datetime.fromisoformat(dt)
        jalali = jdatetime.datetime.fromgregorian(datetime=parsed_dt).strftime('%Y/%m/%d')
        return jsonify({'jalali_date': jalali}), 200
    except Exception as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400  




def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@site_api.route('/packages',methods=['POST'])
def packages():
    print('some one call me')
    try:
        mpacks=models.marketer_pack.query.all()
        mpacks=[p.to_dict()for p in mpacks]
        packs=models.package.query.all()
        packs=[pack.to_dict() for pack in packs]
        print(line,mpacks,line)
        print(line,packs,line)

        return jsonify({
            'user_packs': packs,
            'marketer_packs': mpacks
        }), 200
    except Exception as e:
        print(e)
        return jsonify({'message':e})
    

@site_api.route('/delete',methods=['POST'])
@login_required
def delete():
    admin_check(current_user)
    data = request.get_json()
    print('data:',data)
    if data.get('type')=='user':
        pack=models.package.query.filter_by(id=data.get('id')).first()
        db.session.delete(pack)
        db.session.commit()
        return jsonify({'status':'ok'}),200
    elif data.get('type')=='marketer':
        packm=models.marketer_pack.query.filter_by(id=data.get('id')).first()
        db.session.delete(packm)
        db.session.commit()
        return jsonify({'status':'ok'}),200

@site_api.route('/add_pack',methods=['POST'])
@login_required
def add_pack():
    admin_check(current_user)
    data = request.get_json()
# type: "marketr"
    print(line,'data:',data,line)
    print(line,'type:',data.get('type'),line)
    if data.get('type')=='marketer':
        try:
            pack=models.marketer_pack(
                pack_name=data.get('pack_name'),
                price=data.get('price')
                
                )
            db.session.add(pack)
            db.session.commit()
            return jsonify({
                    'status':'ok',
                    'message':'package added marketer'
                    
                    }),200
        except Exception as e:
            print('error',e)
            return jsonify({
                'status':'error',
                'message':e

            }), 503
    else:
        try:
            # print('data:',data)
            new_pack=models.package(
                base_send=data.get('send'),
                pack_name=data.get('pack_name'),
                base_find=data.get('find'),
                gost=data.get('ghost'),
                intraction=data.get('ghost'),
                option=data.get('disc'),
                time=curect_enum_time(data.get("time")),
                price=data.get('price')
                )
            db.session.add(new_pack)
            db.session.commit()
            return jsonify({
                'status':'ok',
                'message':'package added'
                
                }),200
        except Exception as e:
            print('error',e)
            return jsonify({
                'status':'error',
                'message':e

            }), 503




@site_api.route('/upload_pic',methods=['POST'])
@login_required
def pic_upload():
    user=current_user
    file = request.files['profile_pic']
    if file and allowed_file(file.filename):
        ext = file.filename.rsplit('.', 1)[1].lower()
        filename = f"{user.id}_profile.{ext}"
        filepath = os.path.join('static','uploads', filename)
        file.save(filepath)
        user.pic_path=filepath
        db.session.add(user)
        db.session.commit()
        return jsonify({'status':1}),200
    else:
        return jsonify({'status':2}),400


@site_api.route('/logout',methods=['POST','GET'])
@login_required
def site_log_out():
    logout_user()
    # return jsonify({'status':1}),200
    return redirect(url_for('login'))



@site_api.route('/send_tiket', methods=['POST'])
def send_tiket_user():
    try:
        data = request.get_json()

        title = data.get('title', '').strip()
        phone = data.get('phone', '').strip()
        email = data.get('email', '').strip()
        department = data.get('department', '').strip()
        message = data.get('message', '').strip()
        parent_id = data.get('parent_id')  # Optional: ticket to reply to

        # Compose full problem text
        full_message = (
            f"عنوان: {title}\n"
            f"شماره تماس: {phone}\n"
            f"ایمیل: {email}\n"
            f"بخش: {department}\n"
            f"متن پیام:\n{message}"
        )

        # Determine if this is an admin reply
        is_admin_reply = current_user.role == UserRole.ADMIN or current_user.role == UserRole.SUPPORT

        new_ticket = models.tiket(
            user_id=current_user.id,
            problem=full_message,
            is_admin_reply=is_admin_reply,
            parent_id=parent_id
        )

        db.session.add(new_ticket)
        db.session.commit()

        return jsonify({'success': True, 'message': 'تیکت با موفقیت ارسال شد.'}), 200

    except Exception as e:
        return jsonify({'success': False, 'message': 'خطا در ارسال تیکت.', 'error': str(e)}), 500




@site_api.route('/reply_ticket', methods=['POST'])
def reply_ticket():
    data = request.get_json()

    parent_id = data.get('ticket_id')
    reply_text = data.get('reply', '').strip()

    if not parent_id or not reply_text:
        return jsonify({'success': False, 'message': 'شناسه یا متن پاسخ ارسال نشده است.'}), 400

    # Validate parent ticket exists
    parent_ticket = models.tiket.query.filter_by(id=parent_id).first()
    if not parent_ticket:
        return jsonify({'success': False, 'message': 'تیکت اصلی پیدا نشد.'}), 404

    # Determine if reply is from admin
    is_admin = current_user.role == UserRole.ADMIN

    reply_ticket = models.tiket(
        user_id=current_user.id,
        problem=reply_text,
        is_admin_reply=is_admin,
        parent_id=parent_ticket.id
    )

    db.session.add(reply_ticket)
    db.session.commit()

    return jsonify({'success': True, 'message': 'پاسخ با موفقیت ارسال شد.'}), 200

@site_api.route('/blog', methods=['POST'])
def create_blog():
    title = request.form.get('title')
    content = request.form.get('content')
    tags = request.form.get('tags')  # optional
    category = request.form.get('category')  # optional

    file = request.files.get('media')
    media_url = None
    media_type = None

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        media_type = 'video' if ext in ['mp4', 'webm'] else 'image'
        save_path = os.path.join(commen_func.up_folder, filename)
        file.save(save_path)
        media_url = f'/static/uploads/{filename}'

    blog = models.Blog(
        title=title,
        content=content,
        media_url=media_url,
        media_type=media_type,
        tags=tags,
        category=category,
        creator=current_user.id
    )
    db.session.add(blog)
    db.session.commit()

    return jsonify({'status': 'success', 'id': blog.id})

