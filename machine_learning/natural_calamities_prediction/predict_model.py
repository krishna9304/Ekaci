import pickle

import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression

#setup ML model instance
lr=LogisticRegression(max_iter=500)

#data reading
data=pd.read_csv("final_data.csv")
data=np.array(data)
data=data[:,1:]

#mask crwation
msk1 = np.random.rand(len(data)) < 0.7
train = data[msk1]
test = data[~msk1]
#read data
x_train=train[:,1:]
y_train=train[:,0]
x_test=test[:,1:]
y_test=test[:,0]

# train the ml model4
lr.fit(x_train,y_train)
# Saved the model file
filename = 'disaster_predict.sav'
pickle.dump(lr, open(filename, 'wb'))

def check_accuracy():
    # learn the regressor
    # print(lr.predict(data))
    count = 0
    for i in range(x_test.shape[0]):
        if (lr.predict([x_test[i]]) == y_test[i]):
            count += 1
    print("accuracy:" + str((count / x_test.shape[0]) * 100))

    # load the model file
    loaded_model = pickle.load(open('disaster_predict.sav', 'rb'))
    result = loaded_model.score(x_test, y_test)
    print(result)


def make_prediction(data):
    print((lr.predict(data)))

check_accuracy()
