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


