const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async event => {
  try {
    const { id } = event.pathParameters;

    console.log(`Fetching TODO item with ID: ${id}`);

    const result = await dynamoDB.get({
      TableName: 'Todo',
      Key: { id }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
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