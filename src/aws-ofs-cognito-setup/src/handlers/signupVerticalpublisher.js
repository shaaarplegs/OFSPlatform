import { DispatchEvent } from './Publisher.js';

async function signupVerticalpublisher(event) {
  return await DispatchEvent({event:event.body,Source:"user.registerVertical"}).promise()
}
  
export const handler = signupVerticalpublisher;