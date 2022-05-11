from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os



app = Flask(__name__, static_folder='ui/build', static_url_path='')
CORS(app)
db = SQLAlchemy(app)
if __name__ == '__main__':
    app.run()

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, nullable=False)

    def __init__(self, text, completed):
        self.text = text
        self.completed = completed

db.create_all()

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/todos/<id>', methods=['GET'])
@cross_origin()
def get_todo(id):
  todo = Todo.query.get(id)
  del todo.__dict__['_sa_instance_state']
  return jsonify(todo.__dict__)

@app.route('/todos', methods=['GET'])
@cross_origin()
def get_todos():
  todos = []
  for todo in db.session.query(Todo).all():
    del todo.__dict__['_sa_instance_state']
    todos.append(todo.__dict__)
  return jsonify(todos)

@app.route('/todos', methods=['POST'])
@cross_origin()
def create_todo():
  body = request.get_json()
  db.session.add(Todo(body['text'], body['completed']))
  db.session.commit()
  todo = db.session.query(Todo).order_by(Todo.id.desc()).first()
  del todo.__dict__['_sa_instance_state']
  return jsonify(todo.__dict__)

@app.route('/todos/<id>', methods=['PUT'])
@cross_origin()
def update_todo(id):
  body = request.get_json()
  db.session.query(Todo).filter_by(id=id).update(
    dict(text=body['text'], completed=body['completed']))
  db.session.commit()
  return "item updated"

@app.route('/todos', methods=['DELETE'])
@cross_origin()
def delete_item():
  db.session.query(Todo).filter_by(completed=True).delete()
  db.session.commit()
  todos = []
  for todo in db.session.query(Todo).all():
    del todo.__dict__['_sa_instance_state']
    todos.append(todo.__dict__)
  return jsonify(todos)