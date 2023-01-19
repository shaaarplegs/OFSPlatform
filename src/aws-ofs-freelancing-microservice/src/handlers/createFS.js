import { createFreelancingObject, putToDynamoDB, DispatchEvent } from './Freelancing.js';

async function createFS(event) {

  const {vertical_id} = JSON.parse(event.body)
  const {name} = JSON.parse(event.body)
  const {city} = JSON.parse(event.body)
  const {description} = JSON.parse(event.body)
  const {price} = JSON.parse(event.body)
  const {scheduledTime} = JSON.parse(event.body)
  const {phone_number} = JSON.parse(event.body)
  const {email} = JSON.parse(event.body)

  console.log('Creating freelancing object...')
  const newFS = createFreelancingObject({
      vertical_id,
      name,
      city,
      description,
      price,
      phone_number,
      email
  })
  
  await putToDynamoDB(newFS).promise();

  console.log('Sending event to eventBridge...')
  await DispatchEvent({fs_id:newFS.id, scheduledTime:scheduledTime}).promise()

  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"Freelancing service created",
    "Freelancing service info": newFS }),
  };

}
  
export const handler = createFS;