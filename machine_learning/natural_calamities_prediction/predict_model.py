import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression

lr=LogisticRegression(max_iter=500)
data=pd.read_csv("final_data.csv")
data=np.array(data)
data=data[:,1:]
msk1 = np.random.rand(len(data)) < 0.7
train = data[msk1]
test = data[~msk1]