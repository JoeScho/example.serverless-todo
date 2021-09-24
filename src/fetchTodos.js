const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async () => {
  try {
    const results = await dynamoDB.scan({ TableName: 'Todo' }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: {
        message: 'Something went wrong'
      }
    }
  }
};

module.exports = { handler };