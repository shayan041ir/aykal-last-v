# # from flask import Flask
# # from models import db
# # #this file resets the db to for new tables and rows but wipes all files clean

# # app = Flask(__name__)

# # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:vtesnoWyky2bngz7mRQzrGCm@sahand.liara.cloud:30285/practical_keller'
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



# # db.init_app(app)  # <-- Don't forget this line!

# # with app.app_context():
# #     db.drop_all()
# #     db.create_all()
# # print('✅ Database updated – existing data preserved.')
# from flask import Flask
# from flask_migrate import Migrate, upgrade, migrate as flask_migrate
# from models import db
# import os

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:vtesnoWyky2bngz7mRQzrGCm@sahand.liara.cloud:30285/practical_keller'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)
# migrate = Migrate(app, db)

# import logging
# logging.getLogger('alembic').setLevel(logging.ERROR)

# MIGRATION_DIR = 'migrations'

# with app.app_context():
#     # Create migrations folder if not exists
#     if not os.path.exists(MIGRATION_DIR):
#         from flask_migrate import init as flask_migrate_init
#         flask_migrate_init(directory=MIGRATION_DIR)

#     # Generate migration scripts
#     flask_migrate(message='auto migration', directory=MIGRATION_DIR)

#     # Apply migrations
#     upgrade(directory=MIGRATION_DIR)

# print("✅ DB schema migrated and upgraded silently.")

from flask import Flask
from flask_migrate import Migrate, init as migrate_init, migrate as migrate_cmd, upgrade as upgrade_cmd
from models import db
import os
import shutil
import logging
#DROP TABLE IF EXISTS alembic_version;
MIGRATION_DIR = 'migrations'
# DATABASE_URI = 'mysql+mysqlconnector://root:vtesnoWyky2bngz7mRQzrGCm@sahand.liara.cloud:30285/practical_keller'
DATABASE_URI = "mysql+mysqlconnector://root:1234m@127.0.0.1:3306/aykal_db"



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

logging.getLogger('alembic').setLevel(logging.ERROR)

with app.app_context():
    if os.path.exists(MIGRATION_DIR):
        print(f"🧹 Removing old '{MIGRATION_DIR}' folder...")
        shutil.rmtree(MIGRATION_DIR)

    print("📦 Initializing new migration directory...")
    migrate_init(directory=MIGRATION_DIR)

    print("🛠️  Generating new migration script...")
    migrate_cmd(message='initial migration', directory=MIGRATION_DIR)

    print("🚀 Applying migration to the database...")
    upgrade_cmd(directory=MIGRATION_DIR)

print("✅ Database schema reset and upgraded successfully.")
