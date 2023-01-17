
import axios from 'axios';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

async function predictableFreelancingServices(event) {
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

    const {threshold} = event.pathParameters;
    let trainableFsList = [];

    await axios.get(`http://ai-estimator.link/predictableFreelancingServices/${threshold}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'username': JSON.parse(secret).username,
            'password': JSON.parse(secret).password
        }
        })
        .then( (r) => {
        console.log(r.data)
        trainableFsList = r.data.freelancingServices
        })
        return {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ "Message":"possible predictable freelancers analyzed","freelancingServices": trainableFsList })
        }


};
  
export const handler = predictableFreelancingServices;