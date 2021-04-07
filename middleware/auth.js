export default ({ route, store, redirect }) => {
  const isOnSignInPage = route.path === '/sign-in';
  const isSignedIn = store.state.user;

  if (!isSignedIn && !isOnSignInPage) {
    redirect('/sign-in');
  } else if (isSignedIn && isOnSignInPage) {
    redirect('/');
  }
};
