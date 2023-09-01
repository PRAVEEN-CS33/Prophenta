# from roboflow import Roboflow

# rf = Roboflow(api_key="KQSYBMVR3uU9mYfiP6ER")

# project = rf.workspace().project("tb-detection-227v0")
# model = project.version(1).model
# img = r'D:\prophenta\Backend\gh2.webp'
# detections = model.predict(img).json()
# class_name = []
# accuracy = []
# for prediction in detections['predictions']:
#     class_name.append(prediction['class'])
#     accuracy.append(prediction['confidence'])
    
# print(detections)
# print(class_name)
# print(accuracy)

import nltk
nltk.download('punkt')