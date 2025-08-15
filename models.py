from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
import enum
db = SQLAlchemy()
from routes.funtions import commen_func







class sale_status(enum.Enum):
    pending=0
    sucsses=1
    faile=2





class sale_way(enum.Enum):
    aykal = 0
    discount = 1
    code_price =2



class UserRole(enum.Enum):
    ADMIN = 0
    MARKETER = 1
    USER = 2
    SUPPORT =3


# user base model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120),  default='user')
    last_name = db.Column(db.String(120),  default='user')
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    discount_token = db.Column(db.String(120), nullable=True)
    pic_path = db.Column(db.String(255), nullable=True)
    role = db.Column(db.Enum(UserRole), default=UserRole.USER)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    instagram_credentials = db.relationship('InstagramCredentials', backref='user')




class denger_sned(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text= db.Column(db.Text, nullable=True)
    created_at=db.Column(db.DateTime, default=datetime.utcnow)


    


    

# users who trun to marketr will be added to this secction
class marketr_details(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,nullable=False)
    email = db.Column(db.String(120),  nullable=True, unique=True)
    bank_card = db.Column(db.String(120),  nullable=True, unique=True)
    sheba_number = db.Column(db.String(120),  nullable=True, unique=True)
    total_sale=db.Column(db.Integer, nullable=True)
    total_sale_price=db.Column(db.Integer, nullable=True)
    mount_sale=db.Column(db.Integer, nullable=True)
    total_mount=db.Column(db.Integer, nullable=True)
    exp_date=db.Column(db.DateTime)
    created_at=db.Column(db.DateTime, default=datetime.utcnow)
    updated_at=db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)






# temp store sms codes
class sms_verfy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Integer, nullable=False)
    Tuser = db.Column(db.Integer, nullable=False)#target user




#sale
class sale(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    track_id=db.Column(db.String(40), unique=True, nullable=False)
    buyer_id=db.Column(db.Integer, nullable=False)
    buyer_phone=db.Column(db.String(15), nullable=False)
    discount_code=db.Column(db.String(15), nullable=True)
    way = db.Column(db.Enum(sale_way), default=sale_way.aykal)
    stats = db.Column(db.Enum(sale_status), default=sale_status.pending)
    seller_id=db.Column(db.Integer, nullable=True)
    package_id=db.Column(db.Integer, nullable=True)
    seller_phone=db.Column(db.String(15), nullable=True)
    sale_price=db.Column(db.BigInteger, nullable=False)
    discount_price=db.Column(db.BigInteger, nullable=True)
    full_price=db.Column(db.BigInteger, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def to_invoice(self):
        if self.stats== sale_status.sucsses:
            return {
                'id': self.id,
                'name': commen_func.packname(self.package_id),
                'date':commen_func.dateJ(self.updated_at),
                'price':self.sale_price
                
            }



class shop_card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, nullable=False)
    pack_id=db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def to_dict(self):
        return{
            'user_id':self.user_id,
            'pack_id':self.pack_id,
            'updated_at':commen_func.dateJ(self.updated_at)
        }





class user_package(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, nullable=False)
    dayly_send=db.Column(db.Integer,default=200, nullable=False)
    dayly_find=db.Column(db.Integer,default=1000, nullable=False)
    gost=db.Column(db.Integer, default=0,nullable=True)
    intraction=db.Column(db.Integer, default=0,nullable=True)
    user_insta_name=db.Column(db.String(120),nullable=True)



class PackageStatus(enum.Enum):
    ACTIVE = 0
    INACTIVE = 1
    PAYMENT = 2
    
class PackageBuyer(enum.Enum):
    USER = 0
    MARKETER = 1
    
    

class pack_durtion(enum.Enum):
    oneM=1
    twoM=2
    thereM=3
    fourM=4
    fiveM=5
    sixM=6
    one_yearM='year'

class marketer_pack(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    pack_name=db.Column(db.String(120),default='pack_marketer',nullable=True)

    price= db.Column(db.BigInteger,default=1000, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def to_dict(self):
        return {
            'id': self.id,
            'name':self.pack_name,
            'price':self.price,
            'type':'marketer',
            'time':commen_func.dateJ(self.created_at)

        }

class package(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    base_send= db.Column(db.Integer,default=200, nullable=False)
    pack_name=db.Column(db.String(120),nullable=True)
    base_find= db.Column(db.Integer,default=1000, nullable=False)
    price= db.Column(db.BigInteger,default=1000, nullable=False)
    gost=db.Column(db.Integer, default=0,nullable=True)
    time = db.Column(db.Enum(pack_durtion), default=pack_durtion.oneM)

    intraction=db.Column(db.Integer, default=0,nullable=True)
    option = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def to_dict(self):
        return {
            'pack_id':self.id,
            'id': self.id,
            'name': self.pack_name,
            'send': self.base_send,
            'find': self.base_find,
            'ghost': self.gost,
            'disc': self.intraction,
            'option': self.option,
            'price': self.price,
            'type':'user',

            'time':self.time.value
        }
    def to_dict2(self):
        return {
            'id': self.id,
            'name': self.pack_name,
            'send': self.base_send,
            'find': self.base_find,
            'ghost': self.gost,
            'intraction': self.intraction,
            'disc': self.option,
            'price': self.price,
            'mount':self.time.value
        }
    def shopcard(self):
        return{
            'pack_name':self.pack_name,
            'price':self.price

        }



# for giveing user some promo    
class admin_gift_package(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    base_send= db.Column(db.Integer,default=200, nullable=False)
    base_find= db.Column(db.Integer,default=1000, nullable=False)
    gost=db.Column(db.Integer, default=0,nullable=True)
    intraction=db.Column(db.Integer, default=0,nullable=True)
    option = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)






#  users defult package  
class defult_promo_package(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    base_send= db.Column(db.Integer,default=200, nullable=False)
    base_find= db.Column(db.Integer,default=1000, nullable=False)
    gost=db.Column(db.Integer, default=0,nullable=True)
    intraction=db.Column(db.Integer, default=0,nullable=True)
    option = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)




   


class tiket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)  # User who owns this ticket/message
    problem = db.Column(db.Text, nullable=True)
    pic_url = db.Column(db.String(255), nullable=True)
    pic_path = db.Column(db.String(255), nullable=True)
    role = db.Column(db.Enum(sale_status), default=sale_status.pending)
    
    # New fields:
    is_admin_reply = db.Column(db.Boolean, default=False)  # True if sent by admin, False if user message
    
    parent_id = db.Column(db.Integer, db.ForeignKey('tiket.id'), nullable=True)  # Link to original ticket
    
    # Relationship to access replies easily
    replies = db.relationship(
        'tiket',
        backref=db.backref('parent', remote_side=[id]),
        lazy='dynamic'
    )
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)




class InstagramCredentials(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    ig_account_id = db.Column(db.String(255), nullable=False)
    fb_page_id = db.Column(db.String(255), nullable=False)
    page_access_token = db.Column(db.Text, nullable=False)
    user_long_token = db.Column(db.Text, nullable=False)
    token_expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<InstagramCredentials {self.ig_account_id}>'



"""
=-=-=-=-=-=-=-=
server and bot
=-=-=-=-=-=-=-=
"""

class bot_servers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ip = db.Column(db.Integer, primary_key=True)
    active = db.Column(db.Boolean, default=True)



class bot_finds(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_find = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    grop_name = db.Column(db.String(255), nullable=False)
    user_found = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    def type_re(self):
        
        return{
            'g_name':self.grop_name,
            'f_user':self.user_found,
            'u_date':self.updated_at,
            'c_date':self.created_at,
            't_find':self.total_find
            


        }        

#blog
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    media_url = db.Column(db.String(255), nullable=True)
    media_type = db.Column(db.String(10), nullable=True)
    tags = db.Column(db.String(255), nullable=True)
    creator=db.Column(db.Integer,nullable=False)
    category = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
