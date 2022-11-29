
import { DispatchEvent } from './Publisher.js';

async function signupFSpublisher(event) {
  return await DispatchEvent({event:event.body, Source:"user.registerFS"}).promise()
}
  
export const handler = signupFSpublisher;