from flask import Flask, request, jsonify, render_template
import os

from torch_utils import get_prediction

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    # xxx.png
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/predict', methods=['POST', 'GET'])


def abc():
    if request.method == 'GET':
        return render_template('index.html', value="hello")
        
    if request.method == 'POST':
        if 'file' not in request.files:
            print("No file")
            return
        file = request.files['file']
        if file.filename != '':
            
            file.save(file.filename)
        prediction = get_prediction(file.filename)
        return render_template('result.html', caption = prediction)


