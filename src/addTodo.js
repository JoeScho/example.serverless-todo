const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const middy = require('@middy/core');
const httpBodyParser = require('@middy/http-json-body-parser');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async event => {
  const Item = {
    todo: event.body.todo,
    createdAt: new Date().toISOString(),
    id: uuid(),
    completed: false,
  };

  console.log(`Creating TODO item with ID: ${Item.id}`);

  await dynamoDB.put({
    TableName: 'Todo',
    Item
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(Item)
  };
};

module.exports = { handler: middy(handler).use(httpBodyParser()) };