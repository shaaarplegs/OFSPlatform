import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createFS(event, context, callback) {

  const {vertical_id} = JSON.parse(event.body)
  const {name} = JSON.parse(event.body)
  const {city} = JSON.parse(event.body)
  const {description} = JSON.parse(event.body)
  const {price} = JSON.parse(event.body)
  const {available} = JSON.parse(event.body)

  const now = new Date();

  const newFS = {
      id: uuid(),
      createdAt: now.toISOString(),
      vertical_id,
      name,
      city,
      description,
      price,
      available
  }

  await dynamodb.put({
    TableName: process.env.FS_TABLE_NAME,
    Item: newFS
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"Freelancing service created",
    "Freelancing service info": newFS }),
  };

}
  
  export const handler = createFS;