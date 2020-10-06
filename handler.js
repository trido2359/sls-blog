
module.exports.helloWorld = async (event, context) => {
    console.log('hello1');
    return {
        statusCode: 200,
        body: 'Hello 123'
    };
};