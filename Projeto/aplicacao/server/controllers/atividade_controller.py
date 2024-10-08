from flask import Blueprint, jsonify, request
from models import Disciplina, Usuario, Atividade
from peewee import *
from playhouse.shortcuts import model_to_dict

atividade_bp = Blueprint('atividade_bp', __name__)

@atividade_bp.route('/atividades', methods=['POST'])
def create_atividade():
    data = request.get_json()
    try:
        usuario = Usuario.get(Usuario.id == data['usuario_id'])     

        disciplina = Disciplina.get(Disciplina.id == data['disciplina_id'])
            
        atividade = Atividade.create(
            titulo=data['titulo'],
            descricao=data.get('descricao', ''),
            data=data['data'],
            tipo=data['tipo'],
            status=data['status'],
            usuario=usuario,
            disciplina=disciplina
        )
        return jsonify(model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario])), 201
    except Usuario.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado'}), 400
    except Disciplina.DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@atividade_bp.route('/atividades', methods=['GET'])
def get_atividades():
    atividades = Atividade.select()
    return jsonify([model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario]) for atividade in atividades]), 200

@atividade_bp.route('/atividades/<int:id>', methods=['GET'])
def get_atividade(id):
    try:
        atividade = Atividade.get(Atividade.id == id)
        return jsonify(model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario])), 200
    except DoesNotExist:
        return jsonify({'error': 'Atividade não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400

@atividade_bp.route('/atividades/<int:id>', methods=['PATCH'])
def update_atividade(id):
    data = request.get_json()
    try:
        atividade = Atividade.get(Atividade.id == id)
        disciplina = Disciplina.get(Disciplina.id == data.get('disciplina_id', atividade.disciplina.id))
        usuario = Usuario.get(Usuario.id == data.get('usuario_id', atividade.usuario.id))
        atividade.titulo = data.get('titulo', atividade.titulo)
        atividade.descricao = data.get('descricao', atividade.descricao)
        atividade.data = data.get('data', atividade.data)
        atividade.tipo = data.get('tipo', atividade.tipo)
        atividade.status = data.get('status', atividade.status)
        atividade.usuario=usuario
        atividade.disciplina=disciplina
        atividade.save()
        return jsonify(model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario])), 200
    except Usuario.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 400
    except Disciplina.DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 400
    except Atividade.DoesNotExist:
        return jsonify({'error': 'Atividade não encontrada.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@atividade_bp.route('/atividades/<int:id>', methods=['DELETE'])
def delete_atividade(id):
    try:
        atividade = Atividade.get(Atividade.id == id)
        atividade.delete_instance()
        return jsonify({'message': 'Atividade deletada com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Atividade não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400