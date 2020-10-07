const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'ap-southeast-1',
});

module.exports.registerAccount = async (event, context) => {
    try {
        const { body } = event;
        const { email, password } = JSON.parse(body);
        const params = {
            ClientId: process.env.COGNITO_CLIENT_ID, /* required */
            Password: password, /* required */
            Username: email, /* required */
          };
          
        const result = await cognitoIdentityServiceProvider.signUp(params).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ accountId: result.UserSub})
        };
    } catch (err) {
        console.log('err register');
        console.log(err);
        
        const { code } = err;
        switch (code) {
            case 'UsernameExistsException':
                return {
                    statusCode: 400,
                    body: 'UsernameExistsException'
                };
        }
        
        return {
            statusCode: 500,
            body: 'Server err'
        };
    }
}

module.exports.helloWorld = async (event, context) => {
    console.log('hello1');
    return {
        statusCode: 200,
        body: 'Hello 123'
    };
};