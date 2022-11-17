
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getStatusbyFreelancingServiceID(event, context) {
    let status;
    const {fs_id} = event.pathParameters;
    const results = await dynamodb.get({
        TableName: process.env.STATUS_TABLE_NAME,
        Key: {fs_id},
    }).promise();
    status = results.Item;
    return {
        statusCode: 200,
        body: JSON.stringify({ status }),
    };
}
  
export const handler = getStatusbyFreelancingServiceID