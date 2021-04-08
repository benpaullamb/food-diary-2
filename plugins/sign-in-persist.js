import AWS from 'aws-sdk';
import { userPool, userPoolId, identityPoolId, region, getAttributes, refreshSession } from '~/plugins/cognito';

export default async ({ store }) => {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    return console.log('No current user');
  }

  const session = await new Promise((res, rej) => {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.warn(err);
        return rej(err);
      }
      res(session);
    });
  });

  const login = `cognito-idp.${region}.amazonaws.com/${userPoolId}`;
  AWS.config.region = region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
    Logins: {
      [login]: session.getIdToken().getJwtToken(),
    },
  });

  if (AWS.config.credentials.needsRefresh()) {
    await refreshSession(cognitoUser);
  }

  const attributes = await getAttributes(cognitoUser);
  store.commit('setUser', attributes);
};
