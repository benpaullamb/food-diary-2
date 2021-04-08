import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { USER_POOL_ID, CLIENT_ID } from './cognito-constants';

const userPool = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export const signUp = async (email, password, name) => {
  const attributes = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'name',
      Value: name,
    }),
  ];

  return new Promise((res, rej) => {
    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        return rej(err);
      }
      res(result.user);
    });
  });
};
