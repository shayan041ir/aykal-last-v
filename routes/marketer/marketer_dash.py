from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
import models
import jdatetime
marketr_bp=Blueprint('marketr_dash',__name__,url_prefix='/marketer')

class buyer:
        def __init__(self, name=None,package=None,amount=1,date=None):
              self.date=date
              self.amount=1
              self.package=package
              self.name=name

@marketr_bp.route('/subscription',methods=['GET'])
@login_required
def subscription():
    subfee=175000
    return render_template('marketr/subscription.html',user=current_user,sub_fee=subfee)


@marketr_bp.route('/dashbourd_m',methods=['GET'])
@login_required
def markter_dashm():

    user= current_user
    print(current_user.role)
    now_jalali = jdatetime.datetime.now()
    current_jalali_year = now_jalali.year
    current_jalali_month = now_jalali.month
    buyres=[]
    if user.role== models.UserRole.MARKETER:
            print('no code')
            sales=models.sale.query.filter_by(seller_id=user.id).all()
            b=0
          
            for i in sales:
                    updated_jalali = jdatetime.datetime.fromgregorian(datetime=i.updated_at)
      
                    if i.stats == models.sale_status.sucsses  and updated_jalali.year == current_jalali_year and updated_jalali.month == current_jalali_month:
                        b += i.full_price
                        cost=models.User.query.filter_by(id=i.buyer_id).first()
        # def __init__(self, name=None,package=None,amount=1,date=None):

                        buyres.append(buyer(name=cost.first_name,package=i.pack_name,date=updated_jalali))
            return render_template('marketr/marketer_dash.html',user=current_user,all_sales=b,profit=b*0.15,buyers=buyres)
    else :
                return redirect (url_for('user.dashboard'))