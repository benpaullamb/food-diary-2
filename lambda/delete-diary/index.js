const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const dynamo = new AWS.DynamoDB();

  try {
    await dynamo
      .deleteItem({
        TableName: 'FoodDiary',
        Key: {
          email: {
            S: event.email,
          },
        },
      })
      .promise();

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.warn(err);
  }
};
