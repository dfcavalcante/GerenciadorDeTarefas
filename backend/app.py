# /backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # NOVO!

from routes.tarefas_routes import tarefas_bp
from routes.auth_routes import auth_bp  # NOVO!

app = Flask(__name__)
CORS(app)

# --- CONFIGURAÇÃO DO JWT ---
app.config["JWT_SECRET_KEY"] = "super-secret-key-mudar-depois" # NOVO!
jwt = JWTManager(app) # NOVO!

# Registro dos Blueprints
app.register_blueprint(tarefas_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth') # NOVO!

if __name__ == '__main__':
    app.run(debug=True, port=5001)