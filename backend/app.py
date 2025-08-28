# /backend/app.py

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from routes.tarefas_routes import tarefas_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

# --- ALTERAÇÃO FEITA AQUI ---
# Esta configuração mais explícita garante que todas as suas rotas de API
# aceitem requisições do seu frontend sem problemas de CORS.
CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- CONFIGURAÇÃO DO JWT ---
app.config["JWT_SECRET_KEY"] = "super-secret-key-mudar-depois"
jwt = JWTManager(app)

# Registro dos Blueprints
app.register_blueprint(tarefas_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Bloco de execução principal
if __name__ == '__main__':
    app.run(debug=True, port=5000)