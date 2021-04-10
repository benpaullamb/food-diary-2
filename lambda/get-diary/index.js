const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const dynamo = new AWS.DynamoDB();

  try {
    const record = await dynamo
      .getItem({
        TableName: 'FoodDiary',
        Key: {
          email: {
            S: event.email,
          },
        },
      })
      .promise();

    return AWS.DynamoDB.Converter.unmarshall(record.Item);
  } catch (err) {
    console.warn(err);
  }
};
