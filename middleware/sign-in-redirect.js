export default ({ route, store, redirect }) => {
  const isOnSignInPage = route.path === '/sign-in';
  const isOnSignUpPage = route.path === '/sign-up';
  const isSignedIn = store.state.user;

  if (!isSignedIn && (!isOnSignInPage || !isOnSignUpPage)) {
    return redirect('/sign-in');
  }
  
  if (isSignedIn && (isOnSignInPage || isOnSignUpPage)) {
    return redirect('/');
  }
};
