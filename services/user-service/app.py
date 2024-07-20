from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/users')
def users():
    return {
        "users": [
            "Raya",
            "Supiya",
            "ajeev"
        ]
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
