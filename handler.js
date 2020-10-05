
module.exports.helloWorld = async (event, context) => {
    console.log('hello');
    return {
        statusCode: 200,
        body: 'Hello 123'
    };
};