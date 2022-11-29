import { DispatchEvent } from './Publisher.js';


async function signupVerticalpublisher(event) {

  console.log("event: ")
  console.log(event.body)
  
  return await DispatchEvent({event:event.body}).promise()
  
}
  
  export const handler = signupVerticalpublisher;