import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

CAMINHO_ARQUIVO = os.path.join(os.path.dirname(__file__), '..', 'data', 'usuarios.json')

def _carregar_usuarios():
    try:
        with open(CAMINHO_ARQUIVO, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def _salvar_usuarios(usuarios):
    with open(CAMINHO_ARQUIVO, 'w', encoding='utf-8') as f:
        json.dump(usuarios, f, indent=2)

def obter_usuario_por_username(username):
    usuarios = _carregar_usuarios()
    for usuario in usuarios:
        if usuario['username'] == username:
            return usuario
    return None

# ALTERADO: A função agora aceita 'nome_completo'
def adicionar_usuario(username, password, nome_completo):
    usuarios = _carregar_usuarios()
    if obter_usuario_por_username(username):
        return None  # Usuário já existe

    novo_id = max([u['id'] for u in usuarios]) + 1 if usuarios else 1
    
    password_hash = generate_password_hash(password)
    
    novo_usuario = {
        'id': novo_id,
        'username': username, # Este ainda será o email
        'password_hash': password_hash,
        'nome_completo': nome_completo # NOVO CAMPO SALVO!
    }
    
    usuarios.append(novo_usuario)
    _salvar_usuarios(usuarios)
    
    return novo_usuario

    novo_id = max([u['id'] for u in usuarios]) + 1 if usuarios else 1
    
    password_hash = generate_password_hash(password) # Cria o hash da senha
    
    novo_usuario = {
        'id': novo_id,
        'username': username,
        'password_hash': password_hash
    }
    
    usuarios.append(novo_usuario)
    _salvar_usuarios(usuarios)
    
    return novo_usuario

def verificar_senha(usuario, password):
    """Verifica se a senha fornecida corresponde ao hash."""
    return check_password_hash(usuario['password_hash'], password)