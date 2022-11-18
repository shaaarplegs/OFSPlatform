
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function retrieveFS(event, context) {
    let freelancingservices;

    const results = await dynamodb.scan({
            TableName: process.env.FS_TABLE_NAME,
        }).promise();
        freelancingservices = results.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ freelancingservices }),
    };
}
  
export const handler = retrieveFS