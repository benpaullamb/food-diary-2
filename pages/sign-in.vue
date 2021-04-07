<template>
  <b-container class="pt-5">
    <h1>Food Diary</h1>
    <h4>Sign in</h4>

    <b-row>
      <b-col sm="6">
        <b-form>
          <b-form-group label="Username" label-for="username">
            <b-form-input id="username" type="text" v-model="username" />
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" type="password" v-model="password" />
          </b-form-group>

          <b-button @click="signIn">Sign in</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { auth, getUser } from '~/plugins/cognito';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async signIn() {
      if (this.$store.state.user?.username) {
        return this.$router.push('/');
      }

      const authTokens = await auth(this.username, this.password);
      if (!authTokens) {
        return console.log('Invalid username/password or something went wrong');
      }

      const user = await getUser(authTokens.AccessToken);
      this.$store.commit('setUser', user);
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
