import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createVertical(event, context) {

    const {name} = JSON.parse(event.body)
    const now = new Date();

    const newVertical = {
        id: uuid(),
        createdAt: now.toISOString(),
        name:name,
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ newVertical }),
    };
  }
  
  export const handler = createVertical;