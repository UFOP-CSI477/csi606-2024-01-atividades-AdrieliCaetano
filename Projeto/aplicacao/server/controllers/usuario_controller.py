from flask import Blueprint, jsonify, request
from models import Usuario
from peewee import *
from playhouse.shortcuts import model_to_dict

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.get_json()
    try:
        usuario = Usuario.create(
            nome=data['nome'],
            sobrenome=data['sobrenome'],
            email=data['email']
        )
        return jsonify(model_to_dict(usuario)), 201
    except IntegrityError:
        return jsonify({'error': 'Email já cadastrado.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@usuario_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.select()
    return jsonify([model_to_dict(usuario) for usuario in usuarios]), 200

@usuario_bp.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    try:
        usuario = Usuario.get(Usuario.id == id)
        return jsonify(model_to_dict(usuario)), 200
    except DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400
    
@usuario_bp.route('/usuarios/<int:id>', methods=['PATCH'])
def update_usuario(id):
    data = request.get_json()
    try:
        usuario = Usuario.get(Usuario.id == id)
        usuario.nome = data.get('nome', usuario.nome)
        usuario.sobrenome = data.get('sobrenome', usuario.sobrenome)
        usuario.email = data.get('email', usuario.email)
        usuario.save()
        return jsonify(model_to_dict(usuario)), 200
    except DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except IntegrityError:
        return jsonify({'error': 'Email já cadastrado.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@usuario_bp.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    try:
        usuario = Usuario.get(Usuario.id == id)
        usuario.delete_instance()
        return jsonify({'message': 'Usuário deletado com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400
