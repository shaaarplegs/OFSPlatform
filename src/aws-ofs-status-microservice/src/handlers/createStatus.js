import { createStatusObject, putToDynamoDB } from './Status.js';

async function createStatus(event) {
  
  const StatusObj = createStatusObject({fs_id:event.detail.fs_id,scheduledTime:event.detail.scheduledTime})
  putToDynamoDB(StatusObj);
  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"freelancing timeline schedule status created",
    "Status information": StatusObj }),
  };

}
  
  export const handler = createStatus;