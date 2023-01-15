
import { putToDynamoDB } from './Vertical.js';

async function createVerticalsSQSBatch(event) {
    console.log(event)  
    const item = JSON.parse(event.Records[0].body).detail.event
    console.log(item)
    return await putToDynamoDB(item).promise();
}

export const handler = createVerticalsSQSBatch