from flask import Flask , blueprints,render_template,redirect,url_for,request, send_from_directory
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import models
from routes.api import api_login
from routes.admin import admin_dashbord
from routes.api import api
from routes.marketer import marketer_dash
from routes.user import user_dashbord
from routes.mail import mail
from routes.funtions import commen_func
from routes.payment import payment
from routes.bots import bots
from routes.instagram_api import insta_api
from routes.landing import landing_r

from routes.blog import blog
import os
from app import models
from routes.user import insta_finders
app = Flask(__name__)
def read_secret_key():
    with open('secret_key.txt', 'r') as file:
        return file.readline().strip().encode('utf-8')



app.config['SECRET_KEY'] ='aykla'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:vtesnoWyky2bngz7mRQzrGCm@sahand.liara.cloud:30285/practical_keller'
#app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:1234m@127.0.0.1:3306/aykal_db"

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:SrNroLvPnQvWQjgygUdXzXKc@aykaldb-v2:3306/nice_kepler'
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
login_manager = LoginManager()
login_manager.init_app(app)
models.db.init_app(app)
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'webm'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
with app.app_context():
    models.db.create_all()

app.register_blueprint(bots.bots_pb)
app.register_blueprint(insta_finders.in_find)
app.register_blueprint(marketer_dash.marketr_bp)
app.register_blueprint(landing_r.landing_bp)
app.register_blueprint(mail.mail_bp)
app.register_blueprint(api.site_api)
app.register_blueprint(api_login.api_login_bp)
app.register_blueprint(payment.payment_bp)
app.register_blueprint(commen_func.profiles_bp)
app.register_blueprint(blog.blog_bp)
app.register_blueprint(commen_func.pack_bp)
app.register_blueprint(admin_dashbord.admin_bp)
app.register_blueprint(user_dashbord.user_bp)
app.register_blueprint(insta_api.insta_bp)


login_manager.login_view='login'

@app.context_processor
def inject_request():
    return dict(request=request)


@login_manager.user_loader
def load_user(user_id):
    return models.User.query.filter_by(id=int(user_id)).first()

@app.route('/redirect',methods=['GET'])
@login_required
def redi():
    if current_user.role.value==1:
        return redirect('/marketer/dashbourd_m')
    elif current_user.role.value==2:
        return redirect('/user_dashboard')
    elif current_user.role.value==0:
        return redirect('/admin/admin_dashboard')
    

@app.route('/login', methods=['GET'])
def login():
    if not current_user.is_authenticated:
        
        return render_template('login/login.html')  # or abort(403)
    
    
    if request.endpoint == 'login':
        return redirect('/redirect')
    


@app.route('/')
def landing():
    blogs = models.Blog.query.order_by(models.Blog.created_at.desc()).all()
    
    return render_template('landing/landing-page.html',list=commen_func.list_pack(), blogs=blogs)


if __name__ == '__main__':
    from app import models
    
    app.run(host='0.0.0.0', port=5000, debug=True)
