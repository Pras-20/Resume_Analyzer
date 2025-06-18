from functools import wraps
from flask import request, jsonify, current_app
import jwt
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token=request.headers.get('Authorization')

        if token:
            try:
                token=token.split(" ")[1]
                data=jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
                current_user=User.query.get(data['user_id'])

            except:
                return jsonify({"message":"Invalid or expired token"}),401
        else:
            return jsonify({"message","Token is missing"}),401

        return f(current_user,*args,**kwargs)
    return decorated
