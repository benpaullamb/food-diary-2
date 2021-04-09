import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const USER_POOL_ID = 'eu-west-1_AbAUtX5Sa';
export const CLIENT_ID = '536bq7ndl0p9qjh3qjp426lhkf';
export const USER_POOL = new CognitoUserPool({
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
});

export const REGION = 'eu-west-1';
export const IDENTITY_POOL_ID = 'eu-west-1:82628243-e7e1-489f-a941-ea07ca1117d0';
export const LOGIN_KEY = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
