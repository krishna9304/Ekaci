import numpy as np

import pandas as pd

data= pd.read_csv('Rainfall.csv')

data['JAN'].fillna((data['JAN'].mean()), inplace=True)
data['FEB'].fillna((data['FEB'].mean()), inplace=True)
data['MAR'].fillna((data['MAR'].mean()), inplace=True)
data['APR'].fillna((data['APR'].mean()), inplace=True)
data['MAY'].fillna((data['MAY'].mean()), inplace=True)
data['JUN'].fillna((data['JUN'].mean()), inplace=True)
data['JUL'].fillna((data['JUL'].mean()), inplace=True)
data['AUG'].fillna((data['AUG'].mean()), inplace=True)
data['SEP'].fillna((data['SEP'].mean()), inplace=True)
data['OCT'].fillna((data['OCT'].mean()), inplace=True)
data['NOV'].fillna((data['NOV'].mean()), inplace=True)
data['DEC'].fillna((data['DEC'].mean()), inplace=True)
data['ANNUAL'].fillna((data['ANNUAL'].mean()), inplace=True)
data['Jan-Feb'].fillna((data['Jan-Feb'].mean()), inplace=True)
data['Mar-May'].fillna((data['Mar-May'].mean()), inplace=True)
data['Jun-Sep'].fillna((data['Jun-Sep'].mean()), inplace=True)
data['Oct-Dec'].fillna((data['Oct-Dec'].mean()), inplace=True)

print(data.head())
data=np.array(data)
print(data.shape)