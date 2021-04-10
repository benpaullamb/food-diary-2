const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const dynamo = new AWS.DynamoDB();

  try {
    await dynamo
      .putItem({
        TableName: 'FoodDiary',
        Item: AWS.DynamoDB.Converter.marshall(event),
      })
      .promise();

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.warn(err);
  }
};
