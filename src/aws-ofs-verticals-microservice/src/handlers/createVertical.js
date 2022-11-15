import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createVertical(event, context, callback) {
    
    const eventBridge = new AWS.EventBridge()
    const {name} = JSON.parse(event.body)
    const now = new Date();

    const newVertical = {
        id: uuid(),
        createdAt: now.toISOString(),
        name:name,
    }

    await dynamodb.put({
      TableName: process.env.VERTICALS_TABLE_NAME,
      Item: newVertical
    }).promise();
    
    return {
      statusCode: 201,
      body: JSON.stringify({ "Message":"Vertical created",
      "vertical": newVertical }),
    };
  }
  
  export const handler = createVertical;