
import { createVerticalObject,DispatchEvent } from './Vertical.js';

async function createVertical(event) {
    const {name} = JSON.parse(event.body)
    const verticalObj = createVerticalObject({name:name})
    return await DispatchEvent({event:verticalObj}).promise();
}

export const handler = createVertical