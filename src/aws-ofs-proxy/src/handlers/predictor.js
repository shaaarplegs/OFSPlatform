
import axios from 'axios';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";


async function predictor(event) {
    // Getting keys from secrets manager
    const secret_name = "predictionSecret";
    const client = new SecretsManagerClient({
    region: "eu-west-1",
    });

    let response;

    try {
    response = await client.send(
        new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
    );
    } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
    }

    const secret = response.SecretString;
    let price = 0;
    const {description} = JSON.parse(event.body)

    await axios.post(`http://ai-estimator.link/predict`, { 
        "description": description
        },  {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'predictionKeyID': JSON.parse(secret).predictionKeyID,
            'predictionSecretAccess': JSON.parse(secret).predictionSecretAccess
        }
        })
        .then( (r) => {
        console.log(r.data)
        price = r.data.Price
        })
        return {
            statusCode: 200,
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify({ "Message":"Price predicted","price": price })
        }

};
  
export const handler = predictor;