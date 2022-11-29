import { DispatchEvent } from './Publisher.js';

async function signupFSpublisher(event) {


  await DispatchEvent({event:event, source:"user.registerFS"}).promise()
  
  return {
    statusCode: 201,
    body: JSON.stringify({ "Message":"user registered with FS permissions. "}),
  };
  
}
  
  export const handler = signupFSpublisher;