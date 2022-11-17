import { v4 as uuid} from 'uuid';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();
const eventbridge = new AWS.EventBridge()

async function createFS(event, context, callback) {

  const {vertical_id} = JSON.parse(event.body)
  const {name} = JSON.parse(event.body)
  const {city} = JSON.parse(event.body)
  const {description} = JSON.parse(event.body)
  const {price} = JSON.parse(event.body)
  const {scheduledTime} = JSON.parse(event.body)

  const now = new Date();

  const newFS = {
      id: uuid(),
      createdAt: now.toISOString(),
      vertical_id,
      name,
      city,
      description,
      price
  }

  await dynamodb.put({
    TableName: process.env.FS_TABLE_NAME,
    Item: newFS
  }).promise();


  const params = {
    Entries: [ 
      {
        Detail: JSON.stringify({
          fs_id:newFS.id,
          scheduledTime:scheduledTime
        }),
        EventBusName: 'aws-ofs-eventBus',
        DetailType: 'create',
        Source: 'vertical.createFS',
        Time: new Date()
      }
    ]
  }
  const result = await eventbridge.putEvents(params).promise()
  console.log(result)

  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"Freelancing service created",
    "Freelancing service info": newFS }),
  };

}
  
export const handler = createFS;