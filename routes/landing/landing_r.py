from flask import Flask , Blueprint,render_template,redirect,url_for,request
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import models


landing_bp=Blueprint('landing_help',__name__,url_prefix='/landing')


@landing_bp.route('/about')
def about():

    return render_template('landing/about.html')


@landing_bp.route('/faq')
def faq():

    return render_template('landing/faq.html')


@landing_bp.route('/hamkaribama')
def hamkaribama():

    return render_template('landing/hamkaribama.html')


@landing_bp.route('/blog')
def blog():
    blogs = models.Blog.query.order_by(models.Blog.created_at.desc()).all()
    return render_template('landing/blog.html', blogs=blogs)



@landing_bp.route('/rules')
def rules():

    return render_template('landing/rules.html')


@landing_bp.route('/tamasbama')
def ertebat():
    return render_template('landing/tamasbama.html')


