from flask import Blueprint, jsonify, request
from models import Disciplina, Usuario
from peewee import *
from playhouse.shortcuts import model_to_dict

disciplina_bp = Blueprint('disciplina_bp', __name__)

@disciplina_bp.route('/disciplinas', methods=['POST'])
def create_disciplina():
    data = request.get_json()
    try:
        usuario = Usuario.get(Usuario.id == data['usuario_id'])

        disciplina = Disciplina.create(
            nome=data['nome'],
            sigla_abreviacao=data['sigla_abreviacao'],
            usuario=usuario
        )
        return jsonify(model_to_dict(disciplina)), 201
    except IntegrityError:
        return jsonify({'error': 'Usuário já possui uma disciplina com esse nome cadastrada.'}), 400
    except Usuario.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@disciplina_bp.route('/disciplinas', methods=['GET'])
def get_disciplinas():
    disciplinas = Disciplina.select()
    return jsonify([model_to_dict(disciplina) for disciplina in disciplinas]), 200

@disciplina_bp.route('/disciplinas/<int:id>', methods=['GET'])
def get_disciplina(id):
    try:
        disciplina = Disciplina.get(Disciplina.id == id)
        return jsonify(model_to_dict(disciplina)), 200
    except DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400

@disciplina_bp.route('/disciplinas/<int:id>', methods=['PATCH'])
def update_disciplina(id):
    data = request.get_json()
    try:
        disciplina = Disciplina.get(Disciplina.id == id)
        usuario = Usuario.get(Usuario.id == data.get('usuario_id', disciplina.usuario.id))
        disciplina.nome =  data.get('nome', disciplina.nome)
        disciplina.sigla_abreviacao =  data.get('sigla_abreviacao', disciplina.sigla_abreviacao)
        disciplina.usuario = usuario
        disciplina.save()
        return jsonify(model_to_dict(disciplina)), 200
    except Usuario.DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 400
    except Disciplina.DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 400
    except IntegrityError:
        return jsonify({'error': 'Usuário já possui uma disciplina com esse nome cadastrada.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@disciplina_bp.route('/disciplinas/<int:id>', methods=['DELETE'])
def delete_disciplina(id):
    try:
        disciplina = Disciplina.get(Disciplina.id == id)
        disciplina.delete_instance()
        return jsonify({'message': 'Disciplina deletada com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400
