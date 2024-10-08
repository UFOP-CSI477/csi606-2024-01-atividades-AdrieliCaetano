from peewee import *
from config import POSTGRES

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
    email = CharField(unique=True)

class Disciplina(BaseModel):
    nome = CharField(max_length=255)
    sigla_abreviacao = CharField(max_length=10)
    usuario = ForeignKeyField(Usuario, backref='disciplinas', on_delete='CASCADE')

    class Meta:
        indexes = (
            (('nome', 'usuario'), True),
        )

class Atividade(BaseModel):
    titulo = CharField(max_length=255)
    descricao = CharField(max_length=500, null=True)
    data = DateTimeField(formats='%Y-%m-%d %H:%M:%S%z')
    tipo = CharField(max_length=50)
    status = BooleanField(default=False)
    usuario = ForeignKeyField(Usuario, backref='atividades', on_delete='CASCADE')
    disciplina = ForeignKeyField(Disciplina, backref='atividades', on_delete='CASCADE')

# Função para criar as tabelas no banco de dados
def create_tables():
    with db:
        db.create_tables([Usuario, Disciplina, Atividade])
