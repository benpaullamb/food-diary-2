<template>
  <b-container>
    <h1>Home</h1>
    <span>{{ username || 'You are not signed in' }}</span>
    <NuxtLink to="/sign-in">Sign in</NuxtLink>
    <NuxtLink to="/sign-up">Sign up</NuxtLink>
  </b-container>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.user?.username;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
