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
    username = dados.get('username')
    password = dados.get('password')

    if not username or not password:
        return jsonify({"erro": "Username e password são obrigatórios."}), 400

    if obter_usuario_por_username(username):
        return jsonify({"erro": "Username já existe."}), 409

    novo_usuario = adicionar_usuario(username, password)
    return jsonify({"mensagem": "Usuário registrado com sucesso!", "user_id": novo_usuario['id']}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    username = dados.get('username')
    password = dados.get('password')

    usuario = obter_usuario_por_username(username)

    if usuario and verificar_senha(usuario, password):
        # AQUI ESTÁ A CORREÇÃO! Convertendo o ID para string.
        access_token = create_access_token(identity=str(usuario['id']))
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"erro": "Username ou senha inválidos."}), 401