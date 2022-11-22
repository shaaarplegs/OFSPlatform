import requests
import json
import numpy as np
import pandas as pd
import pytest
import os
import boto3

# Getting all the verticals

cloudformation = boto3.resource(
    service_name='cloudformation',
    region_name='eu-west-1',
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"] ,
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"] 
)


def getApiGatewayGeneratedID():
    for stack in cloudformation.stacks.all():
        for r in stack.resource_summaries.all() :
            if (str(r.stack_name)=="aws-ofs-verticals-microservice-dev") & (str(r.logical_id) == 'HttpApi') :
                return str(r.physical_resource_id)

def getVerticals():
    return requests.get('https://{generatedId}.execute-api.eu-west-1.amazonaws.com/vertical'.format(generatedId=getApiGatewayGeneratedID())).json()


def test_answer():
    VerticalsDic = getVerticals()
    assert len(VerticalsDic['verticals']) == 0