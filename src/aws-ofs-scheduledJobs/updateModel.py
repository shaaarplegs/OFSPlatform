import requests 

def updateModel(event, context):
    response = requests.get('https://2aguwr1xtg.execute-api.eu-west-1.amazonaws.com/updateModel/40')
    print(response.json())