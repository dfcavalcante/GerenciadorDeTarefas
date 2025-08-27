# /backend/routes/tarefas_routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.gerenciador_tarefas import (
    obter_todas_as_tarefas,
    obter_tarefa_por_id,
    adicionar_tarefa,
    atualizar_tarefa,
    deletar_tarefa
)

# Cria um "Blueprint", um pacote de rotas que pode ser registrado na aplicação principal
tarefas_bp = Blueprint('tarefas_routes', __name__)

# Rota para LISTAR todas as tarefas
@tarefas_bp.route('/tarefas', methods=['GET'])
@jwt_required()
def get_tarefas():
    tarefas = obter_todas_as_tarefas()
    return jsonify(tarefas)

# Rota para OBTER uma tarefa específica por ID
@tarefas_bp.route('/tarefas/<int:tarefa_id>', methods=['GET'])
@jwt_required()
def get_tarefa(tarefa_id):
    tarefa = obter_tarefa_por_id(tarefa_id)
    if tarefa:
        return jsonify(tarefa)
    return jsonify({"erro": "Tarefa não encontrada"}), 404

# Rota para CRIAR uma nova tarefa
@tarefas_bp.route('/tarefas', methods=['POST'])
@jwt_required()
def create_tarefa():
    dados = request.get_json()
    # Validação simples para garantir que os dados necessários foram enviados
    if not dados or 'titulo' not in dados or 'tempo_pomodoro_minutos' not in dados:
        return jsonify({"erro": "Dados incompletos. 'titulo' e 'tempo_pomodoro_minutos' são obrigatórios."}), 400
    
    nova_tarefa = adicionar_tarefa(dados)
    return jsonify(nova_tarefa), 201

# Rota para ATUALIZAR uma tarefa existente (ex: mudar o status)
@tarefas_bp.route('/tarefas/<int:tarefa_id>', methods=['PUT'])
@jwt_required()
def update_tarefa(tarefa_id):
    dados = request.get_json()
    tarefa_atualizada = atualizar_tarefa(tarefa_id, dados)
    if tarefa_atualizada:
        return jsonify(tarefa_atualizada)
    return jsonify({"erro": "Tarefa não encontrada"}), 404

# Rota para DELETAR uma tarefa
@tarefas_bp.route('/tarefas/<int:tarefa_id>', methods=['DELETE'])
@jwt_required()
def delete_tarefa(tarefa_id):
    sucesso = deletar_tarefa(tarefa_id)
    if sucesso:
        return jsonify({"mensagem": "Tarefa deletada com sucesso"})
    return jsonify({"erro": "Tarefa não encontrada"}), 404