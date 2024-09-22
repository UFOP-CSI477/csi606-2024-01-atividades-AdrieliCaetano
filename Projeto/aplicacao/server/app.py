from flask import Flask, jsonify, request
from peewee import *
from config import POSTGRES
from playhouse.shortcuts import model_to_dict

app = Flask(__name__)
db = PostgresqlDatabase(
    POSTGRES['database'],
    user=POSTGRES['user'],
    password=POSTGRES['password'],
    host=POSTGRES['host'],
    port=POSTGRES['port']
)

# Criação das classes de modelo
class BaseModel(Model):
    class Meta:
        database = db

class Usuario(BaseModel):
    nome = CharField(max_length=255)
    sobrenome = CharField(max_length=255)
    email = CharField(unique=True)  # Email deve ser único

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'

class Disciplina(BaseModel):
    nome = CharField(max_length=255)
    sigla_abreviacao = CharField(max_length=10)
    usuario = ForeignKeyField(Usuario, backref='disciplinas', on_delete='CASCADE')

    class Meta:
        indexes = (
            (('nome', 'usuario'), True),  # Um usuário não deve possuir disciplinas com o mesmo nome
        )

    def __str__(self):
        return f'{self.nome} ({self.sigla_abreviacao})'

class Atividade(BaseModel):
    titulo = CharField(max_length=255)
    descricao = CharField(max_length=500, null=True)
    data = DateTimeField(formats='%Y-%m-%d %H:%M:%S%z')
    tipo = CharField(max_length=50)  # Exemplo: prova, trabalho, etc.
    status = BooleanField(default=False)  # Concluído ou não
    usuario = ForeignKeyField(Usuario, backref='atividades', on_delete='CASCADE')
    disciplina = ForeignKeyField(Disciplina, backref='atividades', on_delete='CASCADE')

    def __str__(self):
        return f'{self.titulo} - {self.data} ({self.status})'


# Conecta ao banco de dados antes de cada requisição
@app.before_request
def _db_connect():
    db.connect()

# Fecha a conexão com o banco de dados após a requisição
@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        db.close()

# Função para criar as tabelas no banco de dados
def create_tables():
    with db:
        db.create_tables([Usuario, Disciplina, Atividade])


# Criação das rotas e funções CRUD para a entidade Usuario
@app.route('/usuarios', methods=['POST'])
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

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.select()
    return jsonify([model_to_dict(usuario) for usuario in usuarios]), 200

@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    try:
        usuario = Usuario.get(Usuario.id == id)
        return jsonify(model_to_dict(usuario)), 200
    except DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400
    
@app.route('/usuarios/<int:id>', methods=['PATCH'])
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
    
@app.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    try:
        usuario = Usuario.get(Usuario.id == id)
        usuario.delete_instance()
        return jsonify({'message': 'Usuário deletado com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Criação das rotas e funções CRUD para a entidade Disciplina
@app.route('/disciplinas', methods=['POST'])
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

@app.route('/disciplinas', methods=['GET'])
def get_disciplinas():
    disciplinas = Disciplina.select()
    return jsonify([model_to_dict(disciplina) for disciplina in disciplinas]), 200

@app.route('/disciplinas/<int:id>', methods=['GET'])
def get_disciplina(id):
    try:
        disciplina = Disciplina.get(Disciplina.id == id)
        return jsonify(model_to_dict(disciplina)), 200
    except DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400

@app.route('/disciplinas/<int:id>', methods=['PATCH'])
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
    
@app.route('/disciplinas/<int:id>', methods=['DELETE'])
def delete_disciplina(id):
    try:
        disciplina = Disciplina.get(Disciplina.id == id)
        disciplina.delete_instance()
        return jsonify({'message': 'Disciplina deletada com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Disciplina não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Criação das rotas e funções CRUD para a entidade Atividade
@app.route('/atividades', methods=['POST'])
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

@app.route('/atividades', methods=['GET'])
def get_atividades():
    atividades = Atividade.select()
    return jsonify([model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario]) for atividade in atividades]), 200

@app.route('/atividades/<int:id>', methods=['GET'])
def get_atividade(id):
    try:
        atividade = Atividade.get(Atividade.id == id)
        return jsonify(model_to_dict(atividade, backrefs=True, exclude=[Disciplina.usuario])), 200
    except DoesNotExist:
        return jsonify({'error': 'Atividade não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}),400

@app.route('/atividades/<int:id>', methods=['PATCH'])
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

@app.route('/atividades/<int:id>', methods=['DELETE'])
def delete_atividade(id):
    try:
        atividade = Atividade.get(Atividade.id == id)
        atividade.delete_instance()
        return jsonify({'message': 'Atividade deletada com sucesso.'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Atividade não encontrada.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)