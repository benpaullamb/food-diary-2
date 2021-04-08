import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

AWS.config.update({ region: 'eu-west-1' });
const cognito = new AWS.CognitoIdentityServiceProvider();
const clientId = '536bq7ndl0p9qjh3qjp426lhkf';

export const signUp = async (username, password) => {
  try {
    const signUpRes = await cognito
      .signUp({
        ClientId: clientId,
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: username,
          },
        ],
      })
      .promise();
    console.log(signUpRes);
    return signUpRes;
  } catch (err) {
    console.warn(err);
  }
};

export const verify = async (username, code) => {
  try {
    const verifyRes = await cognito
      .confirmSignUp({
        ClientId: clientId,
        Username: username,
        ConfirmationCode: code,
      })
      .promise();
    console.log(verifyRes);
    return verifyRes;
  } catch (err) {
    console.warn(err);
  }
};

export const auth = async (username, password) => {
  const authTokens = getCache();

  if (!authTokens) {
    if (username && password) {
      return await newTokens(username, password);
    }
    return;
  }

  const exp = authTokens.exp - DateTime.now().toSeconds();
  const fiveMins = 5 * 60;
  if (exp > fiveMins) {
    return authTokens;
  }

  const tokens = await refreshTokens(authTokens.RefreshToken);
  if (tokens) {
    return tokens;
  }

  if (username && password) {
    return await newTokens(username, password);
  }
};

export const getUser = async (accessToken) => {
  try {
    const user = await cognito
      .getUser({
        AccessToken: accessToken,
      })
      .promise();
    return {
      username: user.Username,
    };
  } catch (err) {
    console.warn(err);
  }
};

const newTokens = async (username, password) => {
  try {
    const { AuthenticationResult } = await cognito
      .initiateAuth({
        ClientId: clientId,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      })
      .promise();
    cache(AuthenticationResult);
    return AuthenticationResult;
  } catch (err) {
    console.warn(err);
  }
};

const refreshTokens = async (refreshToken) => {
  try {
    const { AuthenticationResult } = await cognito
      .initiateAuth({
        ClientId: clientId,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
      .promise();
    cache(AuthenticationResult);
    return AuthenticationResult;
  } catch (err) {
    console.warn(err);
  }
};

const cache = (authTokens) => {
  const authJwt = jwt.sign(authTokens, clientId, { expiresIn: authTokens.ExpiresIn });
  window.localStorage.setItem('lamb', authJwt);
};

const getCache = () => {
  const cookie = window.localStorage.getItem('lamb');
  return jwt.decode(cookie, clientId);
};
