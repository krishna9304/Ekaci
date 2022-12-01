# import json
import os


import numpy as np
from flask import Flask, request, jsonify

import tensorflow as tf
import tensorflow_hub as hub
import urllib.request


app = Flask(__name__)

model= tf.keras.models.load_model(
       ('croprice_damage_mobileNetv5.h5'),
       custom_objects={'KerasLayer': hub.KerasLayer}
)

@app.route('/get', methods= ['GET'])
def get():
       return jsonify({'message':'hello'})


@app.route('/estimate_damage', methods= ['POST'])
def calculate_damage_estimate():
       data = request.get_json(force=True)
       for i in range(5):
              urllib.request.urlretrieve(data['img'+str(i+1)],
                     "./images/img"+str(i+1)+".png")


       for i in os.listdir('./images'):
              test = np.array(tf.keras.utils.load_img("./images/"+i, target_size=(224, 224))) / 255
              input = np.append(test)
              print(input.shape)
              predictions= model.predict(input)
              l=[]
              for j in range(3):
                     for i in range(5):
                            l[j]= l[j]+predictions[i][j]
                     l[j]= l[j]/3.0

              k= np.argmax(l)
              return jsonify({"prediction":str(k), "confidence": str(l[k])})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

