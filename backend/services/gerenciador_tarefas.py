import json
import os

# Constrói o caminho para o arquivo de dados de forma segura
CAMINHO_ARQUIVO = os.path.join(os.path.dirname(__file__), '..', 'data', 'tarefas.json')

def _carregar_tarefas():
    """Função auxiliar para carregar as tarefas do arquivo JSON."""
    try:
        with open(CAMINHO_ARQUIVO, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        # Se o arquivo não existir, retorna uma lista vazia
        return []

def _salvar_tarefas(tarefas):
    """Função auxiliar para salvar a lista de tarefas no arquivo JSON."""
    with open(CAMINHO_ARQUIVO, 'w', encoding='utf-8') as f:
        # indent=2 formata o JSON para ser mais legível
        json.dump(tarefas, f, indent=2)

# --- Funções que serão usadas pelas rotas ---

def obter_todas_as_tarefas():
    """Retorna a lista completa de tarefas."""
    return _carregar_tarefas()

def obter_tarefa_por_id(tarefa_id):
    """Busca e retorna uma única tarefa pelo seu ID."""
    tarefas = _carregar_tarefas()
    for tarefa in tarefas:
        if tarefa['id'] == tarefa_id:
            return tarefa
    return None # Retorna None se não encontrar a tarefa

def adicionar_tarefa(dados_nova_tarefa):
    """Adiciona uma nova tarefa à lista, incluindo os novos campos."""
    tarefas = _carregar_tarefas()

    # Gera um novo ID para a tarefa
    novo_id = max([t['id'] for t in tarefas]) + 1 if tarefas else 1

    # Cria o dicionário completo da nova tarefa
    nova_tarefa = {
        'id': novo_id,
        'titulo': dados_nova_tarefa['titulo'],
        'status': 'pendente', # Status padrão para novas tarefas
        'tempo_pomodoro_minutos': int(dados_nova_tarefa['tempo_pomodoro_minutos']),
        
        # --- LÓGICA ATUALIZADA AQUI ---
        # Usamos .get() para fornecer valores padrão caso os campos não sejam enviados na requisição
        'prioridade': dados_nova_tarefa.get('prioridade', 'media'),
        'data_de_vencimento': dados_nova_tarefa.get('data_de_vencimento', None) # Pode ser nulo
    }
    
    tarefas.append(nova_tarefa)
    _salvar_tarefas(tarefas)
    
    # Retorna o dicionário completo da tarefa que foi criada
    return nova_tarefa

def atualizar_tarefa(tarefa_id, dados_atualizacao):
    """Atualiza os dados de uma tarefa existente."""
    tarefas = _carregar_tarefas()
    for tarefa in tarefas:
        if tarefa['id'] == tarefa_id:
            # O método update atualiza as chaves do dicionário com os novos valores
            tarefa.update(dados_atualizacao)
            _salvar_tarefas(tarefas)
            return tarefa
    return None

def deletar_tarefa(tarefa_id):
    """Deleta uma tarefa da lista."""
    tarefas = _carregar_tarefas()
    
    # Cria uma nova lista com todas as tarefas, exceto a que tem o ID para deletar
    tarefas_atualizadas = [t for t in tarefas if t['id'] != tarefa_id]

    # Verifica se alguma tarefa foi realmente removida
    if len(tarefas_atualizadas) < len(tarefas):
        _salvar_tarefas(tarefas_atualizadas)
        return True # Sucesso
    
    return False # Tarefa não encontrada