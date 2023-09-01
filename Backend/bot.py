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

import pickle
import random
import numpy as np
import torch
import torch.nn as nn

from model import NeuralNet
from utils import bag_of_words, tokenize

import nltk
nltk.data.path.append(r'D:\prophenta\Backend\punkt')
nltk.download('punkt')


rf = Roboflow(api_key="KQSYBMVR3uU9mYfiP6ER")

app = Flask(__name__)
CORS(app)

with open(r'D:\prophenta\Backend\intents.json', 'r') as json_data:
    intents = json.load(json_data)

data = torch.load(r"D:\prophenta\Backend\model.pth")

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

diabetes = pickle.load(open(r"D:\prophenta\Backend\diabetes_model.pkl", "rb"))

bot_name = "BOT"

questions = [

"How many times have you been pregnant?",
"What is your glucose level?",
"What is your blood pressure?",
"What is your skin thickness?",
"What is your insulin level?",
"What is your BMI (Body Mass Index)?",
"What is your diabetes pedigree function?",
"What is your age?"
]

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


def bot(msg):
  sentence = tokenize(msg)
  X = bag_of_words(sentence, all_words)
  X = X.reshape(1, X.shape[0])
  X = torch.from_numpy(X).to(device)
  output = model(X)
  _, predicted = torch.max(output, dim=1)
  tag = tags[predicted.item()]
  probs = torch.softmax(output, dim=1)
  prob = probs[0][predicted.item()]
  return [tag, prob]

asking_questions = False
current_question_index = 0
user_responses = []
def get_response(msg):
    global asking_questions
    global current_question_index
    global user_responses

    bot_r = bot(msg)
    tag = bot_r[0]
    prob = bot_r[1]

    if asking_questions:
        if current_question_index < len(questions):
            response = questions[current_question_index]
            try:
                user_data = float(msg)
                user_responses.append(float(user_data))
            except ValueError:
                if tag == "Exit":
                    asking_questions = False
                    current_question_index = 0
                    user_responses = []
                    for intent in intents['intents']:
                        if tag == intent["tag"]:
                            return random.choice(intent['responses'])
                return "Please provide your valid value for: " + questions[current_question_index - 1] + " Based on the information only, I can give you a prediction."
            # user_responses.append(float(user_data))
            current_question_index += 1
            # if current_question_index == len(questions):
            #     asking_questions = False
            #     current_question_index = 0
            #     user_responses = []
            #     return "Thank you for providing your responses. your data:"+d
            return response
        else:
            try:
                user_d = float(msg)
                user_responses.append(float(user_d))
            except ValueError:
                if tag == "Exit":
                    asking_questions = False
                    current_question_index = 0
                    user_responses = []
                    for intent in intents['intents']:
                        if tag == intent["tag"]:
                            return random.choice(intent['responses'])
                return "Please provide your valid value for: "+ questions[len(questions)-1] + " Based on the information only, I can give you a prediction."
            asking_questions = False
            current_question_index = 0
            input_values_as_numpy_array = np.asarray(user_responses).reshape(1, -1)
            pred = diabetes.predict(input_values_as_numpy_array)
            if pred[0] == 1:
                result = "Yes, based on the data you provided, it seems that you might have diabetes. I strongly recommend consulting a medical professional for further evaluation and advice."
            else:
                result = "No, according to the information you've given, it looks like you're doing well and don't show signs of diabetes. Keep up the healthy habits!"
            print(user_responses)
            return "Thank you for providing your responses." + result

    if tag == "diabetes_prediction":
        response = questions[current_question_index]
        current_question_index += 1
        asking_questions = True
        return "Let's start the questions for diabetes prediction.\n" + response

    if prob.item() > 0.5:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    return "I'm sorry, but I'm having trouble understanding your question): Could you please rephrase it or provide more context?"

@app.route('/bot', methods=['POST'])
def interact_with_bot():
    user_input = request.form.get('text')
    response = get_response(user_input)
    return jsonify({'response': response})

@app.route('/botimg', methods=['POST'])
def interact_with_bot_img():
    user_input = request.form.get('text')
    image_file = request.files['image']
    bot_r = bot(user_input)
    tag = bot_r[0]
    prob = bot_r[1]
    if tag == "Exit":
        for intent in intents['intents']:
            if tag == intent["tag"]:
                response_data = {"result": random.choice(intent['responses'])}
                return json.dumps(response_data)
    elif tag == "Eye Disease":
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
        print(class_name[0])
        if class_name[0] == "cataract":
            result = "The results of the image analysis show that you have a {}% chance of having cataracts. cataract are a common eye condition that can cause blurred vision, glare, and difficulty seeing at night. It is important to see an eye doctor to confirm the diagnosis and discuss treatment options.".format(accuracy[0])
        else:
            positive_res = ["The results of the image analysis show that you are free of any diseases.",
                        "You are perfectly healthy, according to the image analysis.",
                        "The image analysis shows that you have no signs of disease.",
                        "You are in the clear, according to the image analysis.",
                        "You are good to go, according to the image analysis."]
            result = random.choice(positive_res)

        response_data = {
                "image_data": predicted_image_base64,
                "class_name": class_name,
                "accuracy": accuracy,
                "result":result
        }
        return json.dumps(response_data)
    else:
        if prob.item() > 0.7:
            for intent in intents['intents']:
                if tag == intent["tag"]:
                    result_o = random.choice(intent['responses']) + "I am not sure how I am doing, but I am starting to get frustrated. I am not sure what to do..."
                    response_data = {"result":result_o}
                    return json.dumps(response_data)
        response_data = {"result":"I'm sorry, but I'm having trouble understanding your question): Could you please rephrase it or provide more context?"}
        return json.dumps(response_data)

if __name__ == '__main__':
    app.run(debug=True,
            port=5001)