import requests
import json
import numpy as np
import pandas as pd
import pytest
import os
import boto3


cloudformation = boto3.resource(
    service_name='cloudformation',
    region_name='eu-west-1',
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"] ,
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"] 
)

def getApiGatewayGeneratedID():
    for stack in cloudformation.stacks.all():
        for r in stack.resource_summaries.all() :
            if (str(r.stack_name)=="aws-ofs-freelancing-microservice-dev") & (str(r.logical_id) == 'HttpApi') :
                return str(r.physical_resource_id)

def getFreelancingServices():
    return requests.get('https://{generatedId}.execute-api.eu-west-1.amazonaws.com/fs'.format(generatedId=getApiGatewayGeneratedID())).json()

def test_retrieveFS():
    fsDic = getFreelancingServices()
    # test require atleast one fs created
    assert len(fsDic['freelancingservices']) > 0