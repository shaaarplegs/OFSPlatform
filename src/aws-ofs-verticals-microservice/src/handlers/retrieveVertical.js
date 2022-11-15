
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function retrieveVertical(event, context) {
    let verticals;


    const results = await dynamodb.scan({
            TableName: process.env.VERTICALS_TABLE_NAME,
        }).promise();
    verticals = results.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ verticals }),
    };
}
  
  export const handler = retrieveVertical