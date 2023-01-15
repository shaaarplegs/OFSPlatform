from fastapi import FastAPI, Header
import boto3
import pickle
from pydantic import BaseModel
import pymongo
import sys
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import CountVectorizer
import s3fs
from pickle import dump
import os

app = FastAPI()
class Prompt(BaseModel):
    description: str

@app.post("/predict")
def predict(body_dict: Prompt,
    predictionKeyID: str = Header(None),
    predictionSecretAccess: str = Header(None)):
    s3_client =boto3.client('s3')
    s3_bucket_name='pricing-estimator-ai'
    s3 = boto3.resource('s3',
                        region_name="eu-west-1",
                        aws_access_key_id=predictionKeyID,
                        aws_secret_access_key=predictionSecretAccess)
    my_bucket=s3.Bucket(s3_bucket_name)
    model_file = 'model.pkl'
    vectorizer_file = 'vectorizer.pkl'

    # load model
    obj = s3.Object(s3_bucket_name, model_file)
    model = pickle.loads(obj.get()['Body'].read())

    # load vectorizer
    obj = s3.Object(s3_bucket_name, vectorizer_file)
    vectorizer = pickle.loads(obj.get()['Body'].read())

    userDescription = body_dict.description
    new_description_vector = vectorizer.transform([userDescription])
    predicted_price = model.predict(new_description_vector)

    return {"Price":int(predicted_price[0])}

@app.get("/predictableFreelancingServices/{threshold}")
def getPredictableFreelancingServices(
    username: str = Header(None),
    password: str = Header(None),
    threshold: int = 45
):
    client = pymongo.MongoClient('mongodb+srv://{user}:{password}@aws-ofs-pricingdb.2nunmyc.mongodb.net'.format(user=username, password=password))
    ##Specify the database to be used
    db = client.pricing

    ##Specify the collection to be used
    col = db.pricing

    cursor = col.find({})
    df = pd.DataFrame(cursor)

    ##Count the number of records in the collection
    fsCount = pd.DataFrame(df['FS'].value_counts()).reset_index()
    fsCount.columns = ['FS','count']

    client.close()
    return {'freelancingServices':fsCount[fsCount['count'] > threshold]['FS'].tolist()}    

@app.get("/updateModel/{threshold}")
def updateModel(
    username: str = Header(None),
    password: str = Header(None),
    threshold: int = 45,
    predictionKeyID: str = Header(None),
    predictionSecretAccess: str = Header(None)
):
    os.environ['AWS_ACCESS_KEY_ID'] = predictionKeyID
    os.environ['AWS_SECRET_ACCESS_KEY'] = predictionSecretAccess
    client = pymongo.MongoClient('mongodb+srv://{user}:{password}@aws-ofs-pricingdb.2nunmyc.mongodb.net'.format(user=username, password=password))
    ##Specify the database to be used
    db = client.pricing

    ##Specify the collection to be used
    col = db.pricing

    cursor = col.find({})
    df = pd.DataFrame(cursor)

    fsCount = pd.DataFrame(df['FS'].value_counts()).reset_index()
    fsCount.columns = ['FS','count']
    trainableFS = fsCount[fsCount['count'] > threshold]['FS'].tolist()

    df = df[df['FS'].isin(trainableFS)][['description','price']]
    df
    # Vectorize the descriptions using CountVectorizer
    vectorizer = CountVectorizer()
    descriptions_vectors = vectorizer.fit_transform(df.description)

    # Train a linear regression model on the vectors
    regressor = LinearRegression()
    regressor.fit(descriptions_vectors, df['price'])

    # Save the model to a file
    with open('model.pkl', 'wb') as f:
        pickle.dump(regressor, f)

    # Save the vectorizer to a file
    with open('vectorizer.pkl', 'wb') as f:
        pickle.dump(vectorizer, f)


    fs = s3fs.S3FileSystem(anon=False)

    bucket = 'pricing-estimator-ai'
    model_path = 'model.pkl'
    vectorizer_path = 'vectorizer.pkl'

    # update model to s3
    dump(regressor, fs.open(f's3://{bucket}/{model_path}', 'wb'))

    # update vectorizer to s3
    dump(vectorizer, fs.open(f's3://{bucket}/{vectorizer_path}', 'wb'))

    client.close()
    return { 'message': 'Model updated successfully' }