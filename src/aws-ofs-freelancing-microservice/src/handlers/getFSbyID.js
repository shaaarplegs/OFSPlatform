
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getFSbyID(event, context) {
    let freelancingservices;
    const {id} = event.pathParameters;
    const results = await dynamodb.get({
        TableName: process.env.FS_TABLE_NAME,
        Key: {id},
    }).promise();
    freelancingservices = results.Item;
    return {
        statusCode: 200,
        body: JSON.stringify({ freelancingservices }),
    };
}
  
  export const handler = getFSbyID