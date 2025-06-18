from flask import Flask,request,jsonify 
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import bcrypt 
import jwt
import datetime
from functools import wraps
import os 
from analyzer_routes import analyzer_bp 
from dotenv import load_dotenv
from auth_utils import token_required



app=Flask(__name__)


app.register_blueprint(analyzer_bp, url_prefix='/api')

CORS(app)


app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION']=False 
app.config['SECRET_KEY']=os.getenv('SECRET_KEY') ##need to change before checking with postman 

##initiates app db object
db=SQLAlchemy(app)

#User model (basically the essentials for keeping track of user info)
class User(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80),nullable=False)
    email=db.Column(db.String(120),nullable=False)
    password_hash=db.Column(db.LargeBinary,nullable=False)


#either creates the database if it doesnt exist or it doesnt create it..it just updates the database
with app.app_context():
    db.create_all()




@app.route('/')
def home():
    return jsonify({"message":"Flask backend in running!"})

##this section i've created the user registration logic

@app.route('/register',methods=['POST'])

def register():
    data=request.get_json()
    username=data.get('username')
    email=data.get('email')
    password=data.get('password')

    if not username or not email or not password: ##checking whether all entries are filled
        return jsonify({"error":"Please Fill all the Entries to proceed"}),400
    
    if User.query.filter((User.username==username)|(User.email==email)).first(): ##checking whether the user's name already exist or not
        return jsonify({"error":"This User name already exists!"}),409
    
    hashed=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()) ##this is just generic password hashing for data Encryption 


    new_user=User(username=username,email=email,password_hash=hashed)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201



@app.route('/login',methods=['POST'])

def login():

    data=request.get_json()
    user=User.query.filter_by(email=data['email']).first()

    if user and bcrypt.checkpw(data['password'].encode('utf-8'),user.password_hash):
        token=jwt.encode({'user_id':user.id,'exp':datetime.datetime.utcnow() +  datetime.timedelta(hours=2)},app.config['SECRET_KEY'],algorithm='HS256')
        return jsonify({'message':'You have successfully logged in','token':token})
    else:
        return jsonify({'message':"invalid email or password"}),401
    
@app.route('/profile',methods=['GET'])
@token_required
def profile(current_user):
    return jsonify({
        'username':current_user.username,
        'email':current_user.email
    })



if __name__=='__main__':
    app.run(debug=True) 
    





    



