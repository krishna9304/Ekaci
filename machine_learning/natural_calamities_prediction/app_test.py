import requests

url = 'http://localhost:5000/get_data'
r = requests.post(url,json={'district': 'GHATGAON','state':'ODISHA'})
print(r.json())