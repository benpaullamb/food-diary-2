import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

export const region = 'eu-west-1';
export const userPoolId = 'eu-west-1_AbAUtX5Sa';
export const clientId = '536bq7ndl0p9qjh3qjp426lhkf';
export const identityPoolId = 'eu-west-1:82628243-e7e1-489f-a941-ea07ca1117d0';

export const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
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
        console.warn(err);
        return rej(err);
      }
      console.log('Signed up user', result.user);
      return res(result);
    });
  });
};

export const confirmRegistration = async (email, code) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise((res, rej) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }
      console.log('Confirmed registration', result);
      return res(result);
    });
  });
};

export const auth = async (email, password) => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise((res, rej) => {
    cognitoUser.authenticateUser(authDetails, {
      async onSuccess(result) {
        // const accessToken = result.getAccessToken().getJwtToken();
        const login = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;
        const configured = await updateAWSConfig(result, login);
        res(configured);
      },

      onFailure(err) {
        console.warn(err);
        rej(err);
      },
    });
  });
};

const updateAWSConfig = (authRes, login) => {
  return new Promise((res, rej) => {
    AWS.config.region = region;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {
        [login]: authRes.getIdToken().getJwtToken(),
      },
    });

    AWS.config.credentials.refresh((err) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }
      res(authRes);
    });
  });
};

export const refreshSession = async (cognitoUser) => {
  const session = await new Promise((res, rej) => {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }
      res(session);
    });
  });

  const refreshToken = session.getRefreshToken();
  return new Promise((res, rej) => {
    cognitoUser.refreshSession(refreshToken, (err, session) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }

      const login = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;
      AWS.config.region = region;
      AWS.config.credentials.params.Logins[login] = session.getIdToken().getJwtToken();

      AWS.config.credentials.refresh((refreshErr) => {
        if (refreshErr) {
          console.warn(refreshErr);
          return rej(refreshErr);
        }
        res(session);
      });
    });
  });
};

export const getUser = async () => {
  return new Promise(async (res, rej) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      return rej('No current user');
    }

    res(await getAttributes(cognitoUser));
  });
};

export const getAttributes = (cognitoUser) => {
  return new Promise((res, rej) => {
    cognitoUser.getUserAttributes((err, result) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }

      const attributes = result.reduce((obj, attr) => {
        obj[attr.getName()] = attr.getValue();
        return obj;
      }, {});
      res(attributes);
    });
  });
};
