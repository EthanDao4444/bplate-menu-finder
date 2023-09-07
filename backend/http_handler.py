from flask import Flask, request
import flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello world!"
data = ""
@app.route('/users', methods=["GET", "POST"])
def users():
    print("users endpoint reached...")
    if request.method == "GET":
        with open("users.json", "r") as f:
            data = json.load(f)
        return flask.jsonify(data)
    if request.method == "POST":
        received_data = request.get_json()
        print(f"received data: {received_data}")
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received: {message}"
        }
        with open("users.json", "r") as f:
            data = json.load(f)
            data.append({
                "calories": received_data
            })
        with open("users.json", "w") as f:
            f.write(json.dumps(data, indent=4))
        return flask.Response(response=json.dumps(return_data), status=201)