import { auth, getUser } from './cognito';

export default async ({ store }) => {
  const authTokens = await auth();
  if (!authTokens) {
    return;
  }

  const user = await getUser(authTokens.AccessToken);
  store.commit('setUser', user);
};
