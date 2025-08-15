from flask import Blueprint, render_template
import models
from routes.funtions import commen_func
blog_bp = Blueprint('blogs', __name__, url_prefix='/blog')

@blog_bp.route('/blog-details/<int:blog_id>')
def blog_detail(blog_id):
    blog = models.Blog.query.get_or_404(blog_id)
    print(blog.content)
    popular_posts = models.Blog.query.order_by(models.Blog.created_at.desc()).limit(3).all()
    categories = models.db.session.query(models.Blog.category).distinct().all()
    categories = [cat[0] for cat in categories if cat[0]]
    writer=models.User.query.filter_by(id=blog.creator).first()
    print('\n=-=-=-=-=-=-\n',writer,'\n=-=-=-=-=-=-\n')
    return render_template('blogs/blog-details.html', blog=blog, popular_posts=popular_posts, categories=categories,user=writer)