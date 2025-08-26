# /backend/app.py

from flask import Flask
from flask_cors import CORS  # Importa o CORS
from routes.tarefas_routes import tarefas_bp

# Criação da instância principal da aplicação Flask
app = Flask(__name__)

# --- CONFIGURAÇÃO DO CORS ---
# Esta linha permite que qualquer origem (como seu app React)
# faça requisições para a sua API.
CORS(app)

# Registro do Blueprint de tarefas
app.register_blueprint(tarefas_bp, url_prefix='/api')

# Bloco de execução principal
if __name__ == '__main__':
    app.run(debug=True, port=5001)