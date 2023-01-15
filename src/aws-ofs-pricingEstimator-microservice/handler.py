import json
import boto3
import pickle
from botocore.exceptions import ClientError

# def get_secret():

#     secret_name = "predictionSecret"
#     region_name = "eu-west-1"

#     # Create a Secrets Manager client
#     session = boto3.session.Session()
#     client = session.client(
#         service_name='secretsmanager',
#         region_name=region_name
#     )

#     try:
#         get_secret_value_response = client.get_secret_value(
#             SecretId=secret_name
#         )
#     except ClientError as e:
#         raise e

#     # Decrypts secret using the associated KMS key.
#     secret = get_secret_value_response['SecretString']
#     return secret

def PredictPrice(event, context):

    # secret = json.loads(get_secret())
    # s3_client =boto3.client('s3')
    # s3_bucket_name='pricing-estimator-ai'
    # s3 = boto3.resource('s3',
    #                     region_name="eu-west-1",
    #                     aws_access_key_id= secret['predictionKeyID'],
    #                     aws_secret_access_key=secret['predictionSecretAccess'])
    # my_bucket=s3.Bucket(s3_bucket_name)
    model_file = 'model.pkl'
    vectorizer_file = 'vectorizer.pkl'
    # # load model
    # obj = s3.Object(s3_bucket_name, model_file)
    # model = pickle.loads(obj.get()['Body'].read())

    # # load vectorizer
    # obj = s3.Object(s3_bucket_name, vectorizer_file)
    # vectorizer = pickle.loads(obj.get()['Body'].read())


    with open(vectorizer_file, 'rb') as f:
        vectorizer= pickle.load(f)

    with open(model_file, 'rb') as f:
        model = pickle.load(f)


    userDescription = event['description']
    new_description_vector = vectorizer.transform([userDescription])
    predicted_price = model.predict(new_description_vector)

    return {"Price":predicted_price[0]}