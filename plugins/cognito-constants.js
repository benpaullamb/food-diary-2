import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const USER_POOL_ID = 'eu-west-2_G3WJZCZ4F';
export const CLIENT_ID = '4kdc901qkplsj6kfejgd89ovsu';
export const USER_POOL = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export const REGION = 'eu-west-2';
export const IDENTITY_POOL_ID = 'eu-west-2:854b07b4-095e-4a86-84a7-eebfb68f2570';
export const LOGIN_KEY = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
