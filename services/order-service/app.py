from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/orders')
def orders():
    return {
        "orders": [
            "Order 1",
            "Ore 2",
            "Order 3"
        ]
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
