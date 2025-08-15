import requests
from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, login_user,login_required,current_user
import models
from random import randint
import jdatetime
from routes.funtions import commen_func
line='------------------------------------'

payment_bp=Blueprint('payment',__name__,url_prefix='/payment')
'''
        THE url thats going to be redirecet track_id is genreatedet in back end 
        payment_url = f"https://gateway.zibal.ir/start/{track_id}"
'''

class Zibal:
    def __init__(self, merchant="682e1dc3a45c72001b40d080", callback_url="http://aykalapp.com/api/verify"):
    # def __init__(self, merchant="zibal", callback_url="http://aykalapp.com/api/verify"):
        """
        Initialize the Zibal payment gateway integration.
        :param merchant: Your merchant code provided by Zibal.
        :param callback_url: The URL where Zibal will send payment verification callbacks.
        """
        self.merchant = merchant
        self.callback_url = callback_url

    def request(self, amount, order_id, mobile=None, description=None, multiplexingInfos=None):
        """
        Create a payment request.
        :param amount: The amount to be charged (in Rials).
        :param order_id: Your unique order identifier.
        :param mobile: (Optional) Customer mobile number.
        :param description: (Optional) Description for the payment.
        :param multiplexingInfos: (Optional) Additional information if required.
        :return: A dictionary containing the response from Zibal.
        """
        data = {
            'merchant': self.merchant,
            'callbackUrl': self.callback_url,
            'amount': amount,
            'orderId': order_id,
            'mobile': mobile,
            'description': description,
            'multiplexingInfos': multiplexingInfos
        }
        return self.post_to('request', data)

    def verify(self, trackId):
        """
        Verify a payment using the track ID provided by Zibal.
        :param trackId: The track ID to verify.
        :return: A dictionary containing the response from Zibal.
        """
        data = {
            'merchant': self.merchant,
            'trackId': trackId
        }
        return self.post_to('verify', data)

    def post_to(self, path, parameters):
        """
        Post the given parameters to the specified Zibal API endpoint.
        :param path: The API endpoint (e.g., 'request' or 'verify').
        :param parameters: The data dictionary to be sent.
        :return: The JSON response from the API or an error message.
        """
        url = f"https://gateway.zibal.ir/v1/{path}"
        # url = f"https://sandbox-api.zibal.ir"
        try:
            response = requests.post(url, json=parameters)
            print(response)
            response.raise_for_status()

            return response.json()
        except requests.RequestException as e:
            return {"error": str(e)}
        


@payment_bp.route('/verify',methods=['GET','POST'])
@login_required
def verify_pay():
    return render_template('payment/verify-user.html')

@payment_bp.route('/shop_card')
@login_required
def shop_card():
    items=models.shop_card.query.filter_by(user_id=current_user.id).first()
    return render_template('payment/sabad-kharid.html',items=items.to_dict())



@payment_bp.route('/user-pricing')
@login_required
def user_pricing():

    return render_template('user/user-pricing.html',user=current_user,list=commen_func.list_pack())
@payment_bp.route('pay_back',methods=['GET'])
@login_required
def pay_back():

    sales=models.sale.query.filter_by(seller_id=current_user.id).all()
    b=0
          
    for i in sales:
        updated_jalali = jdatetime.datetime.fromgregorian(datetime=i.updated_at)
      
        if i.stats == models.sale_status.sucsses  and updated_jalali.year == commen_func.current_jalali_year and updated_jalali.month == current_jalali_month:
            b += i.full_price
            cost=models.User.query.filter_by(id=i.buyer_id).first()
    return render_template('payment/give-pay.html',user=current_user,profit=b*15)


@payment_bp.route('/become_marketer',methods=['GET','POST'])
@login_required
def package():
    sub_fee=models.marketer_pack.query.filter_by().first()
    amount=sub_fee.price if sub_fee else '180,000'
    if request.method == 'POST':
        name = request.form.get('marketerName')
        phone = request.form.get('marketerPhone')
        import os
        os.system('cls')
        print(line,name,phone)
        # Prevent phone number tampering
        if phone != current_user.phone_number:
            flash('شماره موبایل غیرمعتبر است.', 'danger')
            return redirect(url_for('payment.package'))

       
        if name != current_user.first_name:
            current_user.name = name
            models.db.session.commit()  
            print('new_name is:',name)
        
    return render_template('payment/subscription.html',user=current_user,sub_fee=amount)
