from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import bcrypt
import jwt
import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Secret key for JWT
app.config['SECRET_KEY'] = 'Monty@2005'
FRONTEND_PATH = "/Users/mohitredhu/Desktop/Farm Rise/Frontend"

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Monty@2005",
        database="farmrise_db"
    )

# Serve HTML Pages
@app.route("/")
def home():
    return send_from_directory(FRONTEND_PATH, "/Frontend/index.html")

@app.route("/signup")
def signup_page():
    return send_from_directory(FRONTEND_PATH, "/Frontend/signup.html")

@app.route("/login")
def login_page():
    return send_from_directory(FRONTEND_PATH, "/Frontend/login.html")

@app.route("/dashboard")
def dashboard():
    return send_from_directory(FRONTEND_PATH, "/Frontend/dashboard.html")

# User Signup
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    phone_number = data.get('phoneNumber')

    if not full_name or not email or not password or not role or not phone_number:
        return jsonify({'message': 'All fields are required'}), 400

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    cursor.execute("INSERT INTO users (full_name, email, password, role, phone_number) VALUES (%s, %s, %s, %s, %s)",
                   (full_name, email, hashed_password, role, phone_number))
    db.commit()
    db.close()

    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("SELECT id, full_name, email, password, role FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    db.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):  
        token = jwt.encode(
            {'email': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        return jsonify({'message': 'Login successful', 'token': token, 'redirect': '/dashboard'}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)