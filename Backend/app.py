from flask import Flask, request, jsonify, send_file
from roboflow import Roboflow
from flask_cors import CORS
from PIL import Image
import numpy as np
import pickle
import base64
import json
import cv2
import io
import os

from PIL import Image
import pytesseract
import re

# from ultralytics import YOLO
rf = Roboflow(api_key="KQSYBMVR3uU9mYfiP6ER")

from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'prophenta'

mysql = MySQL(app)

bcancer = pickle.load(open(r"D:\prophenta\Backend\bcancer.pkl", "rb"))
cervix = pickle.load(open(r"D:\prophenta\Backend\svm_model.pkl", "rb"))
diabetes = pickle.load(open(r"D:\prophenta\Backend\diabetes_model.pkl", "rb"))
kindney = pickle.load(open(r"D:\prophenta\Backend\kindney.pkl", "rb"))
lung = pickle.load(open(r"D:\prophenta\Backend\lung_cancer_model.pkl", "rb"))
patient = pickle.load(open(r"D:\prophenta\Backend\stroke.pkl", "rb"))
stroke = pickle.load(open(r"D:\prophenta\Backend\stroke.pkl", "rb"))

# skin_model = YOLO(r"F:\projects\Taiwan\prophenta\backend\results\runs\detect\train\weights\best.pt")\

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

img = r'D:\prophenta\Backend\up.jpg'

def get_db_connection():
    return mysql.connection

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password, method='sha256')

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'message': 'Email already exist'})
    
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))

    conn.commit()
    cursor.close()

    return jsonify({'message': 'Registration successful! Please log in.'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user and check_password_hash(user[2], password):
        return jsonify({'message': 'Login successful!'})
    else:
        return jsonify({'message': 'Invalid email or password'})

@app.route('/bcancer', methods=['POST'])
def predict_bcancer():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = bcancer.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes,there is a chance of breast cancer, Please consult the doctor for further medications"})

@app.route('/cervix', methods=['POST'])
def predict_cervix():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = cervix.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes, there is a chance of cervical cancer, Please consult the doctor for further medications"})
    
@app.route('/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = diabetes.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes, there is a chance of diabetes, Please consult the doctor for further medications"})
    
@app.route('/kindney', methods=['POST'])
def predict_kindney():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = kindney.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes, there is a chance of chronic kidney disease, Please consult the doctor for further medications"})
    
@app.route('/lung', methods=['POST'])
def predict_lung():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = lung.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes,there is a chance of chronic lung disease, Please consult the doctor for further medications"})
    
@app.route('/patient', methods=['POST'])
def predict_patient():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = patient.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "YES"})

@app.route('/stroke', methods=['POST'])
def predict_stroke():
    data = request.json
    input_values = data['data']
    input_values_as_numpy_array = np.asarray(input_values).reshape(1, -1) 
    pred = stroke.predict(input_values_as_numpy_array)
    if pred[0] == 0:
        return jsonify({'prediction': "No, you are alright!"})
    else:
        return jsonify({'prediction': "Yes, there is a chance of stroke, Please consult the doctor for further medications"})

# @app.route('/skin', methods=['POST'])
# def predict_skin():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image file provided'})

#     image_file = request.files['image']
#     input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

#     results = skin_model.predict(input_image_cv2, save_conf=True)
#     print("predict done")
#     result_plotted = results[0].plot()

#     uploaded_extension = image_file.filename.split('.')[-1]
#     print("uploaded_extension:",uploaded_extension)

#     _, predicted_image_bytes = cv2.imencode(".jpg", np.array(result_plotted))
#     predicted_image_bytes = predicted_image_bytes.tobytes()

#     return send_file(io.BytesIO(predicted_image_bytes), mimetype='image/png')

def plot(input_image_cv2, detections):
    for prediction in detections['predictions']:
        x_center = prediction['x']
        y_center = prediction['y']
        width = prediction['width']
        height = prediction['height']
    
        x1 = int(x_center - width / 2)
        y1 = int(y_center - height / 2)
        x2 = int(x_center + width / 2)
        y2 = int(y_center + height / 2)
    
        cv2.rectangle(input_image_cv2, (x1, y1), (x2, y2), (0, 225, 0), 2)
    return input_image_cv2

def send_processed_image(image_bytes, class_name, accuracy):
    image_io = io.BytesIO(image_bytes)
    
    response = send_file(image_io, mimetype='image/jpeg')
    response.headers['ClassName'] = "class_name"
    response.headers['Accuracy'] = "accuracy"
    
    return response

# https://universe.roboflow.com/roboflow-100/brain-tumor-m2pbp/browse
@app.route('/braintu', methods=['POST'])
def predict_braintu():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("brain-tumor-m2pbp")
    model = project.version(1).model

    detections = model.predict(input_image_cv2).json()
    class_name = ""
    accuracy = ""
    if len(detections['predictions']) == 0:
        accuracy = class_name ="No prediction"
    else:
        class_name = detections['predictions'][0]['class']
        accuracy = round(detections['predictions'][0]['confidence']*100)

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/pierre-c/brain-tumor-classification-a3si9/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/brain_cls', methods=['POST'])
def predict_brain_cls():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)

    project = rf.workspace().project("brain-tumor-mri-classifications")
    model = project.version(1).model

    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['predicted_classes']
    confidences = []
    for c in class_names:
        confidences.append(round(detections['predictions'][0]['predictions'][c]['confidence']*100))
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/alzhiemer-detection/alzhiermer/browse
@app.route('/brain_alzhe_cls', methods=['POST'])
def predict_alzhe_cls():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("alzhiermer")
    model = project.version(1).model

    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['top']
    confidences = round(detections['predictions'][0]['confidence']*100)
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/corona/corona-8guwr/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/Stenosis', methods=['POST'])
def predict_Stenosis():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("corona-8guwr")
    model = project.version(1).model

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(round(prediction['confidence']*100))

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/bauman-moscow-state-university/diseases-classifier-on-chexpert-dataset/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/diseases-classifier-on-chexpert-dataset', methods=['POST'])
def predict_diseases_classifier_on_chexpert_dataset():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("diseases-classifier-on-chexpert-dataset")
    model = project.version(2).model

    detections = model.predict(img).json()

    predictions = detections['predictions'][0]['predictions']
    class_names = [prediction['class'] for prediction in predictions]
    confidences = [prediction['confidence'] for prediction in predictions]
    
    response_data = {
        "class": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/kbs-ymeyd/tb-detection-227v0/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/tbdetection', methods=['POST'])
def predict_tb():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("tb-detection-227v0")
    model = project.version(1).model

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(prediction['confidence'])

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/willy-alcantara/willly-chest-x-ray-images-dataset/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/Pneumonia', methods=['POST'])
def predict_Pneumonia():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("willly-chest-x-ray-images-dataset")
    model = project.version(2).model    

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(round(prediction['confidence']*100))

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/w-1h4s7/covidector/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/covid', methods=['POST'])
def predict_covid():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("covidector")
    model = project.version(1).model
    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['predicted_classes'][0]
    confidences = round(detections['predictions'][0]['predictions'][class_names]['confidence']*100)
        
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/roboflow-100/parasites-1s07h/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/parasites', methods=['POST'])
def predict_parasites():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("parasites-1s07h")
    model = project.version(1).model   

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(prediction['confidence'])

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)
# https://universe.roboflow.com/project-ssw5u/liver-tumor-detection-sesia/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/livertumor', methods=['POST'])
def predict_livertumor():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("liver-tumor-detection-sesia")
    model = project.version(1).model
    detections = model.predict(img).json()
    return json.dumps(detections['predictions'])

# https://universe.roboflow.com/cataractannotations/cataractdetection/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/cataractdetection', methods=['POST'])
def predict_cataractdetection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("cataractdetection")
    model = project.version(2).model   

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(round(prediction['confidence']*100))

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/ucla-master-of-quantitative-economics/diabetic-retinopathy-screening-ai/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/level_diabeticretinopathy', methods=['POST'])
def predict_level_diabeticretinopathy():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("diabetic-retinopathy-screening-ai")
    model = project.version(1).model
    detections = model.predict(img).json()
    class_names = detections['predictions'][0]['predicted_classes'][0]
    confidences = round(detections['predictions'][0]['predictions'][class_names]['confidence']*100)
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/cheetah-qcrng/retinal-disease-classification-rxn62/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/diabeticretinopathy', methods=['POST'])
def predict_diabeticretinopathy():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("retinal-disease-classification-rxn62")
    model = project.version(5).model
    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['top']
    confidences = round(detections['predictions'][0]['confidence']*100)
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/columbus-high-school/mpox/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/mpox', methods=['POST'])
def predict_mpox():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)

    project = rf.workspace().project("mpox")
    model = project.version(1).model
    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['predicted_classes'][0]
    confidences = round(detections['predictions'][0]['predictions'][class_names]['confidence']*100)
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/skin-cancer-yp3qt/skin-cancer-svnul/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/skincancer', methods=['POST'])
def predict_skincancer():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("skin-cancer-svnul")
    model = project.version(2).model 

    detections = model.predict(input_image_cv2).json()
    class_name = []
    accuracy = []
    for prediction in detections['predictions']:
        class_name.append(prediction['class'])
        accuracy.append(round(prediction['confidence']*100))

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)
# https://universe.roboflow.com/north-south-university-9briv/skin-cancer-detection-wfldq/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/skincancer_type', methods=['POST'])
def predict_skincancer_type():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    image_file.save(img)
    project = rf.workspace().project("skin-cancer-detection-wfldq")
    model = project.version(3).model

    detections = model.predict(img).json()

    class_names = detections['predictions'][0]['top']
    confidences = round(detections['predictions'][0]['confidence']*100)
    
    response_data = {
        "class_name": class_names,
        "accuracy": confidences
    }
    return json.dumps(response_data)

# https://universe.roboflow.com/class-l9lh0/dermnet/browse?queryText=&pageSize=50&startingIndex=0&browseQuery=true
@app.route('/dermnet', methods=['POST'])
def predict_dermnet():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image_file = request.files['image']
    input_image_cv2 = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    project = rf.workspace().project("dermnet")
    model = project.version(3).model 

    detections = model.predict(input_image_cv2).json()
    class_name = ""
    accuracy = ""
    if len(detections['predictions']) == 0:
        accuracy = class_name ="No prediction"
    else:
        class_name = detections['predictions'][0]['class']
        accuracy = round(detections['predictions'][0]['confidence']*100)

    input_image_cv2 = plot(input_image_cv2, detections)

    _, predicted_image_bytes = cv2.imencode(".jpg", np.array(input_image_cv2))
    predicted_image_base64 = base64.b64encode(predicted_image_bytes).decode('utf-8')
    response_data = {
        "image_data": predicted_image_base64,
        "class_name": class_name,
        "accuracy": accuracy
    }
    return json.dumps(response_data)

@app.route('/extract_data', methods=['POST'])
def extract_data():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image = request.files.get('image')

    image = Image.open(image)

    text = pytesseract.image_to_string(image)
    text = text.lower()

    whitelist = '[^a-zA-Z0-9\s.]'
    text = re.sub(whitelist, ' ', text)
    
    target_words = [
            "age",
            "bloodPressure",
            "specific Gravity",
            "albumin",
            "sugar",
            "rbc",
            "puss chlls",
            "pusschllclumps",
            "bacteria",
            "bloodglucoshrandom",
            "bloodurha",
            "shrumcrhatinine",
            "sodium",
            "potassium",
            "hahmoglobin",
            "packedchllvolume",
            "whithbloodchllscount",
            "redbloodcellscount",
            "hyphrthnsion",
            "diabhtesmellitus",
            "coronaryarthrydishase",
            "apphtith",
            "pedalEdema",
            "anemta"
        ]

    results = {}
    for word in target_words:
        regex_pattern = re.compile(f"(?:{word})\s+(\S+)", re.IGNORECASE)
        matches = regex_pattern.findall(text)
        if word == "age":
            results[word] = matches[1] if matches else ""
        else:
            results[word] = matches[0] if matches else ""

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
