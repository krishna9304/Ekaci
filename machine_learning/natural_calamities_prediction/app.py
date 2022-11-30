import json

import numpy as np
from flask import Flask, request, jsonify
import pandas as pd
import pickle


app = Flask(__name__)
#load the mdel fl sourav bera
filename = 'weather_model.sav'
model = pickle.load(open(filename, 'rb'))
tables = pd.read_html("http://hydro.imd.gov.in/hydrometweb/(S(ht2dew45izstmbyyphslh455))/landing.aspx#")
states={'ANDAMAN & NICOBAR ISLANDS': 0, 'ARUNACHAL PRADESH': 1, 'ASSAM':2, 'MEGHALAYA': 2, 'BIHAR': 3, 'CHHATTISGARH': 4, 'ANDHRA PRADESH': 5,
'KARNATAKA': 6, 'MADHYA PRADESH': 7, 'RAJASTHAN': 8, 'UTTAR PRADESH': 9, 'WEST BENGAL': 10, 'GUJARAT': 11,
'HARYANA': 12,'DELHI': 12, 'HIMACHAL PRADESH': 13, 'JAMMU & KASHMIR': 14, 'JHARKHAND': 15, 'KERALA': 16, 'GOA': 17,
'LAKSHADWEEP': 18, 'MADHYA MAHARASHTRA': 19, 'MATATHWADA': 20, 'NAGALAND':21, 'MANIPUR':21, 'MIZORAM':21, 'TRIPURA': 21, 'KARNATAKA': 22,
'ODISHA': 23, 'PUNJAB': 24, 'RAYALSEEMA': 25, 'SAURASHTRA & KUTCH': 26, 'SOUTH INTERIOR KARNATAKA': 27, 'SUB HIMALAYAN WEST BENGAL & SIKKIM': 28,
'TAMIL NADU': 29, 'TELANGANA': 30, 'UTTARAKHAND': 31, 'VIDARBHA': 32, 'WEST MADHYA PRADESH': 33, 'WEST RAJASTHAN': 34, 'WEST UTTAR PRADESH': 35}

#  read t
tables=np.array(tables[4])
# print(tables)
tables=np.array(tables[1:])

@app.route('/predict_disaster', methods=['POST'])
def predict_disaster():
    #json= {'district': value, 'state': 'ODISHA')
    data= request.get_json(force=True)
    a = max(tables[tables[:, 1] == (data['district'].upper())][:, 2].flatten(), default=-1)
    if(a== -1):
        return jsonify('Invalid District')
    else:

        prediction= model.predict([[states['ODISHA'],a]])

        if (prediction == 0):
            return jsonify("Scare Rainfall, Chances of Drought")
        elif (prediction == 1):
            return jsonify("Moderate rain falling")
        elif (prediction == 2):
            return jsonify("Heavy raining, chances of floods.")
        else:
            return jsonify(" Severe Flood chances are at peak.")

#      Get weather daya
@app.route('/get_data', methods=['POST'])
def get_weather_data():
    data= request.get_json(force= True)




