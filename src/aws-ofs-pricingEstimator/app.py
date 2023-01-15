from fastapi import FastAPI, Header
import boto3
import pickle
from pydantic import BaseModel

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