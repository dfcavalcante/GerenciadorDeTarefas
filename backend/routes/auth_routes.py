# /backend/routes/auth_routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.gerenciador_usuarios import (
    obter_usuario_por_username,
    adicionar_usuario,
    verificar_senha
)

auth_bp = Blueprint('auth_routes', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    dados = request.get_json()
    username = dados.get('username') # Será o email
    password = dados.get('password')
    nome_completo = dados.get('nome_completo') 

    if not username or not password or not nome_completo:
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    if obter_usuario_por_username(username):
        return jsonify({"erro": "Este email já está em uso."}), 409

    novo_usuario = adicionar_usuario(username, password, nome_completo)
    return jsonify({"mensagem": "Usuário registrado com sucesso!", "user_id": novo_usuario['id']}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    
    # --- CORREÇÃO AQUI ---
    # As duas linhas abaixo definem as variáveis 'username' e 'password'
    username = dados.get('username')
    password = dados.get('password')

    usuario = obter_usuario_por_username(username)

    if usuario and verificar_senha(usuario, password):
        additional_claims = {"nome": usuario['nome_completo']}
        
        access_token = create_access_token(
            identity=str(usuario['id']), 
            additional_claims=additional_claims
        )
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"erro": "Email ou senha inválidos."}), 401