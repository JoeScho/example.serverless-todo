const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpBodyParser = require('@middy/http-json-body-parser');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async event => {
  const { completed } = event.body;
  const { id } = event.pathParameters;

  console.log(`Updating TODO item with ID: ${id}`);

  const updatedItem = await dynamoDB.update({
    TableName: 'Todo',
    Key: { id },
    UpdateExpression: 'set completed = :completed',
    ExpressionAttributeValues: {
      ':completed': completed
    },
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(updatedItem)
  };
};

module.exports = { handler: middy(handler).use(httpBodyParser()) };