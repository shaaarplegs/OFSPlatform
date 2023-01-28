
import axios from 'axios';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

async function updateDB(event) {
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

    const {vertical} = JSON.parse(event.body)
    const {FS} = JSON.parse(event.body)
    const {description} = JSON.parse(event.body)
    const {price} = JSON.parse(event.body)

    const toUpload = {
        vertical:vertical,
        FS:FS, 
        description:description,
        price:price
    }

    await axios.post(`http://ai-estimator.link/updateDB`,toUpload, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'username': JSON.parse(secret).username,
            'password': JSON.parse(secret).password
        }
        })
        .then( (r) => {
        console.log(r.data)
        })
        return {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ "Message":"Freelancing service has been added to the model data repository." })
        }


};
  
export const handler = updateDB;