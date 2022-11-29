import AWS from 'aws-sdk';

async function signupAuthorizerFS(event) {


    const detail = JSON.parse(event.detail.event)
    
    // obtain userPool via iss emited event, example: "iss":  "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_cJeRCO1Vn",
    const issSplat = detail.iss.split("/")
    const userPool = issSplat[issSplat.length-1]
    
    var params = { 
      GroupName: 'fs',
      UserPoolId: userPool,
      Username: detail.sub
    }

    //add user to vertical group in user pool
    const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
    await cognitoIdp.adminAddUserToGroup(params).promise();

    return event
}

export const handler = signupAuthorizerFS