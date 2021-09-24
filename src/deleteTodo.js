const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async event => {
  const { id } = event.pathParameters;

  console.log(`Deleting TODO item with ID: ${id}`);

  await dynamoDB.delete({
    TableName: 'Todo',
    Key: { id },
  }).promise();

  return { statusCode: 204 };
};

module.exports = { handler };