from flask import Flask
from flask_cors import CORS
from models import db, create_tables
from controllers.usuario_controller import usuario_bp
from controllers.disciplina_controller import disciplina_bp
from controllers.atividade_controller import atividade_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(usuario_bp)
app.register_blueprint(disciplina_bp)
app.register_blueprint(atividade_bp)

@app.before_request
def _db_connect():
    db.connect()

@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        db.close()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
