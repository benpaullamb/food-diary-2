import { updateStore } from '~/plugins/cognito';

export default async ({ store, route, redirect }) => {
  await updateStore(store);

  const isSignedIn = store.state.user;
  const onSignInPage = route.path === '/sign-in';

  if (isSignedIn && onSignInPage) {
    redirect('/');
  }
};
