import { createStatusObject } from './Status.js';
import AWS from 'aws-sdk';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createStatus(event) {
  const fs_id = event.detail.fs_id;

  const scheduledTime = event.detail.scheduledTime;

  const StatusObj = createStatusObject({fs_id:fs_id,scheduledTime:scheduledTime})

  await putToDynamoDB(StatusObj).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"freelancing timeline schedule status created",
    "Status information": StatusObj }),
  };

}
  
  export const handler = createStatus;