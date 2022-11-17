import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createStatus(event, context, callback) {
  const {fs_id} = JSON.parse(event.body)
  const {scheduledTime} = JSON.parse(event.body)
  const now = new Date();

  const StatusObj = {
      fs_id,
      createdAt: now.toISOString(),
      scheduledTime,
  }

  await dynamodb.put({
    TableName: process.env.STATUS_TABLE_NAME,
    Item: StatusObj
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"freelancing timeline schedule status created",
    "Status information": StatusObj }),
  };

}
  
  export const handler = createStatus;