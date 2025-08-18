from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, current_user,login_required
from models import User,sms_verfy,db,sale,sale_way
import models
from time import sleep
from routes.funtions import commen_func
from routes.api.api import get_bazaryab
debug_line='-------------------------'
class   sellers_sigin_up:
    def __init__(self, name=None,date=None,price=None,img_path=None,phone=None,stats=0):
       
        self.name=name
        self.date=date
        self.price=price
        self.img_path=img_path
        self.phone=phone
        self.stats=stats
       

admin_bp=Blueprint('admin',__name__,url_prefix='/admin')
@admin_bp.before_request
def check_role_admin():
    if not current_user.is_authenticated:
        # Just in case, even with login_required
        return redirect(url_for('login'))  # or abort(403)
    
    print('user:',current_user.role)
    # Check if the current user is admin
    if current_user.role.value!=0:
        # flash('شما دسترسی به این بخش را ندارید', 'danger')
        # sleep(5)
        return redirect(url_for('redi'))

@admin_bp.route('/Addblog',methods=['GET'])
@login_required
def Addblog():
    return render_template('admin/Addblog.html',user=current_user)
@admin_bp.route('/g_requests', methods=['GET'])
@login_required
def g_requests():
    g_list = models.anti_g.query.all()

    result = []
    for g in g_list:
        user = g.user  # from relationship
        result.append({
            "img": user.pic_path if user and user.pic_path else "/static/default.png",
            "name": f"{user.first_name} {user.last_name}" if user else "Unknown",
            "phone": g.phone if hasattr(g, "phone") else "-",   # ✅ phone from anti_g
            "date": commen_func.dateJ(g.created_at),
        })

    return render_template(
        'admin/anti-and-taamol.html',
        user=current_user,
        g_list=result
    )


@admin_bp.route('/Mcomments',methods=['GET'])
@login_required
def Mcomments():
    return render_template('admin/Mcomments.html',user=current_user)

@admin_bp.route('/tickets/<int:ticket_id>/close', methods=['POST'])
@login_required
def close_ticket(ticket_id):
    if current_user.role not in [models.UserRole.ADMIN, models.UserRole.SUPPORT]:
        return redirect('/')

    ticket = models.tiket.query.get_or_404(ticket_id)
    ticket.role = models.sale_status.done
    db.session.commit()
    return redirect(url_for('admin_bp.tickets'))


@admin_bp.route('/ticket/<int:ticket_id>', methods=['GET'])
@login_required
def ticket_view(ticket_id):
    # Fetch the main ticket (must not be a reply itself)
    ticket = models.tiket.query.filter_by(id=ticket_id, parent_id=None).first()

  
    # Fetch sender info
    sender = User.query.get(ticket.user_id)
    print(debug_line,sender.pic_path,debug_line)
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

@admin_bp.route('/tickets', methods=['GET'])
@login_required
def tickets():
    if current_user.role != models.UserRole.ADMIN and current_user.role != models.UserRole.SUPPORT:
        return redirect('/')  # Optional access control

    # Only parent tickets (no replies)
    tickets = models.tiket.query.filter_by(parent_id=None).order_by(models.tiket.created_at.desc()).all()

    return render_template('admin/tickets.html', user=current_user, tickets=tickets)


@admin_bp.route('/agent-denger',methods=['GET'])
@login_required
def agent_denger():
    return render_template('admin/agent-denger.html',user=current_user)





@admin_bp.route('/Mbazaryabha',methods=['GET'])
@login_required
def bazaryabM():
    return render_template('/admin/Mbazaryabha.html',users=get_bazaryab(1),user=current_user)

@admin_bp.route('/Mservises',methods=['GET'])
@login_required
def Mservises():
    return render_template('/admin/Mservises.html',user=current_user)

@admin_bp.route('/Mfaq',methods=['GET'])
@login_required
def Mfaq():
    return render_template('/admin/Mfaq.html',user=current_user)



@admin_bp.route('/Mgavanin',methods=['GET'])
@login_required
def Mgavanin():
    return render_template('/admin/Mgavanin.html',user=current_user)

@admin_bp.route('/Mtamasbama',methods=['GET'])
@login_required
def Mtamasbama():
    return render_template('/admin/Mtamasbama.html',user=current_user)

@admin_bp.route('/Maboutwe',methods=['GET'])
@login_required
def Maboutwe():
    return render_template('/admin/Maboutwe.html',user=current_user)


@admin_bp.route('/biadabha',methods=['GET'])
@login_required
def biadabha():
    return render_template('/admin/biadabha.html',user=current_user)


@admin_bp.route('/Mlanding',methods=['GET'])
@login_required
def Mlanding():
    return render_template('/admin/Mlanding.html',user=current_user)


@admin_bp.route('/Add-MiniAdmin',methods=['GET'])
@login_required
def Add_MiniAdmin():
    return render_template('/admin/Add-MiniAdmin.html',user=current_user)




@admin_bp.route('/admin_dashboard',methods=['GET'])
@login_required
def admin_dashboard():
    sales=sale.query.all()
    total_sale=0
    normal_sale=0
    marketr_sales=0
    marketrs_sigins=[]
    for i in sales:
        if i.way==sale_way.discount:
            marketr_sales+=i.sale_price
        elif i.way==sale_way.aykal:
            normal_sale+=i.sale_price
        elif i.way==sale_way.code_price:
            m=User.query.filter_by(id=i.buyer_id).first()
            marketrs_sigins.append(sellers_sigin_up(name=m.first_name,
                                                    date=i.created_at,
                                                    price=i.sale_price,
                                                    img_path=m.pic_path,
                                                    phone=m.phone_number
                                                    ))

        if i.stats==models.sale_status.sucsses:
            total_sale+=i.sale_price
        
    user=current_user
    
    return render_template('/admin/admin_dashbord.html'
                           ,user=user
                           ,total_sale=total_sale
                           ,m_sale=marketr_sales
                           ,n_sale=normal_sale
                           ,code_buyer=marketrs_sigins
                           )

