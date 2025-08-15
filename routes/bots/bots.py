#/verify/insta_login
# hay_world_its_morteza
from flask import Blueprint, request, jsonify,render_template,flash,redirect,url_for
from flask_login import LoginManager, login_user,current_user
bots_pb=Blueprint('ai',__name__,url_prefix='/verify')
@bots_pb.route('/insta_login')
def insta_verify():
    return render_template('verifye/verify-user.html')
