
import { createVerticalObject, putToDynamoDB } from './Vertical.js';


async function createVertical(event) {
    
    const {name} = JSON.parse(event.body)

    const verticalObj = createVerticalObject({name:name})
    putToDynamoDB(verticalObj);

    return {
      statusCode: 201,
      body: JSON.stringify({ "Message":"Vertical created",
      "vertical": verticalObj }),
    };
}

export const handler = createVertical