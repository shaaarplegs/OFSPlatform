import AWS from 'aws-sdk';
async function updateGroupSignUp(event) {


    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    console.log("event: ")
    console.log(event)
    var params = { 
      GroupName: 'fs',
      UserPoolId: event.userPoolId,
      Username: event.userName
    }
    console.log(": ")
    console.log(params)

    cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

    return event
}

export const handler = updateGroupSignUp