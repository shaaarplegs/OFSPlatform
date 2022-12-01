import { DispatchEvent } from './Publisher.js';

async function signupSSpublisher(event) {
  return await DispatchEvent({event:event.body,Source:"user.registerSS"}).promise()
}
  
export const handler = signupSSpublisher;