import json

import numpy as np
from flask import Flask, request, jsonify
import pandas as pd
import pickle


app = Flask(__name__)

filename = 'weather_model.sav'
model = pickle.load(open(filename, 'rb'))
tables = pd.read_html("http://hydro.imd.gov.in/hydrometweb/(S(ht2dew45izstmbyyphslh455))/landing.aspx#")
states={'ANDAMAN & NICOBAR ISLANDS': 0, 'ARUNACHAL PRADESH': 1, 'ASSAM':2, 'MEGHALAYA': 2, 'BIHAR': 3, 'CHHATTISGARH': 4, 'ANDHRA PRADESH': 5,
'KARNATAKA': 6, 'MADHYA PRADESH': 7, 'RAJASTHAN': 8, 'UTTAR PRADESH': 9, 'WEST BENGAL': 10, 'GUJARAT': 11,
'HARYANA': 12,'DELHI': 12, 'HIMACHAL PRADESH': 13, 'JAMMU & KASHMIR': 14, 'JHARKHAND': 15, 'KERALA': 16, 'GOA': 17,
'LAKSHADWEEP': 18, 'MADHYA MAHARASHTRA': 19, 'MATATHWADA': 20, 'NAGALAND':21, 'MANIPUR':21, 'MIZORAM':21, 'TRIPURA': 21, 'KARNATAKA': 22,
'ODISHA': 23, 'PUNJAB': 24, 'RAYALSEEMA': 25, 'SAURASHTRA & KUTCH': 26, 'SOUTH INTERIOR KARNATAKA': 27, 'SUB HIMALAYAN WEST BENGAL & SIKKIM': 28,
'TAMIL NADU': 29, 'TELANGANA': 30, 'UTTARAKHAND': 31, 'VIDARBHA': 32, 'WEST MADHYA PRADESH': 33, 'WEST RAJASTHAN': 34, 'WEST UTTAR PRADESH': 35}
