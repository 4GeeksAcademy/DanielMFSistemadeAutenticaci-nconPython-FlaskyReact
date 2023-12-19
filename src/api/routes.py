"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import hashlib
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from datetime import datetime, timedelta, timezone
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import CORS
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
CORS(api, supports_credentials=True)
app = Flask(__name__)
bcrypt = Bcrypt(app)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json["email"]
    password = request.json["password"]
   
    user_exists = User.query.filter_by(email=email).first() is not None
   
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
       
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(
    email=email,
    password=hashed_password
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token}), 200
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"error": "Error creating user"}), 400
    
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Bad email or password ⛔️"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    
    

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    #if email != "test" or password != "test":
    #    return {"msg": "Wrong email or password"}, 401
    if user is None:
        return jsonify({"error": "Wrong email or passwords"}), 401
      
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    access_token = create_access_token(identity=email)
    #response = {"access_token":access_token}
  
    return jsonify({
        "email": email,
        "access_token": access_token
    })
    #return response
@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route("/private", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {"message": email}
    return jsonify(dictionary)