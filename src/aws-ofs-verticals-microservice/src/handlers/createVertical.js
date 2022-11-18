
import { createVerticalObject,putToDynamoDB } from './Vertical.js';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createVertical(event) {
    
    const {name} = JSON.parse(event.body)

    const verticalObj = createVerticalObject({name:name})
    await putToDynamoDB(verticalObj).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ 
        "Message":"Vertical created",
        "vertical": verticalObj
     }),
    };
}

export const handler = createVertical