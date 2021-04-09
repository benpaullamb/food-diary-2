import { CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import { USER_POOL, REGION, IDENTITY_POOL_ID, LOGIN_KEY } from './cognito-constants';

const unauthUser = (email) => {
  return new CognitoUser({
    Username: email,
    Pool: USER_POOL,
  });
};

export const signUp = (email, password, name) => {
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
    USER_POOL.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        return rej(err);
      }
      res(result.user);
    });
  });
};

export const verify = (email, code) => {
  return new Promise((res, rej) => {
    unauthUser(email).confirmRegistration(code, true, (err, result) => {
      if (err) {
        return rej(err);
      }
      res(result === 'SUCCESS');
    });
  });
};

export const resendCode = (email) => {
  return new Promise((res, rej) => {
    unauthUser(email).resendConfirmationCode((err, result) => {
      if (err) {
        return rej(err);
      }
      res(result);
    });
  });
};

export const auth = (email, password) => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((res, rej) => {
    unauthUser(email).authenticateUser(authDetails, {
      async onSuccess(result) {
        updateCreds(result);

        try {
          await refreshCreds();
          return res(result);
        } catch (err) {
          rej(err);
        }
      },

      onFailure(err) {
        rej(err);
      },
    });
  });
};

const updateCreds = (session) => {
  AWS.config.region = REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
    Logins: {
      [LOGIN_KEY]: session.getIdToken().getJwtToken(),
    },
  });
};

const refreshCreds = () => {
  return new Promise((res, rej) => {
    AWS.config.credentials.refresh((err) => {
      if (err) {
        return rej(err);
      }
      res(true);
    });
  });
};

export const getCurrentUser = () => {
  const cognitoUser = USER_POOL.getCurrentUser();
  if (!cognitoUser) {
    return;
  }

  return new Promise((res, rej) => {
    cognitoUser.getSession((err, session) => {
      if (err) {
        return rej(err);
      }
      updateCreds(session);
      res(cognitoUser);
    });
  });
};

export const getUserAttributes = async () => {
  const cognitoUser = await getCurrentUser();
  if (!cognitoUser) {
    return;
  }

  const attributes = await new Promise((res, rej) => {
    cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        return rej(err);
      }
      res(attributes);
    });
  });

  return attributes.reduce((obj, attribute) => {
    obj[attribute.Name] = attribute.Value;
    return obj;
  }, {});
};

export const signOut = async () => {
  const cognitoUser = await getCurrentUser();
  if (!cognitoUser) {
    return;
  }
  cognitoUser.signOut();
  return true;
};

export const updateStore = async (store) => {
  if (store.state.user) {
    return;
  }
  try {
    const userAttributes = await getUserAttributes();
    store.commit('setUser', userAttributes);
  } catch (err) {
    return;
  }
};
