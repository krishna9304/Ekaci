import pandas as pd
import numpy as np
from predict_model import make_prediction

# fetching data from IMD Dataset
tables = pd.read_html("http://hydro.imd.gov.in/hydrometweb/(S(ht2dew45izstmbyyphslh455))/landing.aspx#")
# recent yesterday data


states={'ANDAMAN & NICOBAR ISLANDS': 0, 'ARUNACHAL PRADESH': 1, 'ASSAM':2, 'MEGHALAYA': 2, 'BIHAR': 3, 'CHHATTISGARH': 4, 'ANDHRA PRADESH': 5,
'KARNATAKA': 6, 'MADHYA PRADESH': 7, 'RAJASTHAN': 8, 'UTTAR PRADESH': 9, 'WEST BENGAL': 10, 'GUJARAT': 11,
'HARYANA': 12,'DELHI': 12, 'HIMACHAL PRADESH': 13, 'JAMMU & KASHMIR': 14, 'JHARKHAND': 15, 'KERALA': 16, 'GOA': 17,
'LAKSHADWEEP': 18, 'MADHYA MAHARASHTRA': 19, 'MATATHWADA': 20, 'NAGALAND':21, 'MANIPUR':21, 'MIZORAM':21, 'TRIPURA': 21, 'KARNATAKA': 22,
'ODISHA': 23, 'PUNJAB': 24, 'RAYALSEEMA': 25, 'SAURASHTRA & KUTCH': 26, 'SOUTH INTERIOR KARNATAKA': 27, 'SUB HIMALAYAN WEST BENGAL & SIKKIM': 28,
'TAMIL NADU': 29, 'TELANGANA': 30, 'UTTARAKHAND': 31, 'VIDARBHA': 32, 'WEST MADHYA PRADESH': 33, 'WEST RAJASTHAN': 34, 'WEST UTTAR PRADESH': 35}

tables=np.array(tables[4])
tables=np.array(tables[1:])

def get_currrain(district):
    # print(tables[:,0])
    a = max(tables[tables[:, 1] == district.upper()][:, 2].flatten())
    print(a)
    return a

def predict(district):
    var=  make_prediction([[states['ODISHA'], get_currrain(district)]])

    if (var == 0):
        return "Scare Rainfall, Chances of Drought"
    elif (var == 1):
        return "Moderate rain falling"
    elif (var == 2):
        return "Heavy raining, chances of floods."
    else:
        return "Severe Flood chances are at peak."






