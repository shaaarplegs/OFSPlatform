
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();
 
async function getVerticalByID(event, context) {
    let verticals;
    const {id} = event.pathParameters;
    const results = await dynamodb.get({
        TableName: process.env.VERTICALS_TABLE_NAME,
        Key: {id},
    }).promise();
    verticals = results.Item;

    return {
        statusCode: 200,
        body: JSON.stringify({ verticals }),
    };
}
  
  export const handler = getVerticalByID