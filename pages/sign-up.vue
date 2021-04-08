<template>
  <b-container class="pt-5">
    <h1>Food Diary</h1>
    <h4>Sign Up</h4>

    <b-row>
      <b-col sm="6">
        <b-form v-if="!isPendingVerification">
          <b-form-group label="Username" label-for="username">
            <b-form-input id="username" type="text" v-model="username" />
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" type="password" v-model="password" />
          </b-form-group>

          <b-button @click="signUp">Sign Up</b-button>
        </b-form>

        <b-form v-if="isPendingVerification">
          <b-form-group label="Verification code" label-for="code">
            <b-form-input id="code" type="text" v-model="code" />
          </b-form-group>

          <b-button @click="verify">Verify</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { signUp, confirmRegistration, auth } from '~/plugins/cognito';

export default {
  data() {
    return {
      username: '',
      password: '',
      code: '',
      isPendingVerification: false,
    };
  },
  methods: {
    async signUp() {
      if (!this.username || !this.password) {
        return;
      }

      const res = await signUp(this.username, this.password);
      console.log('sign-up', res);
      this.isPendingVerification = true;
    },

    async verify() {
      if (!this.code) {
        return;
      }

      const res = await confirmRegistration(this.username, this.code);
      console.log('confirm registration', res);

      this.signIn();
    },

    async signIn() {
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
