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
import { auth } from '~/plugins/cognito';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async signIn() {
      console.log('authing');
      const authRes = await auth(this.username, this.password);
      console.log('authRes', authRes);
    },
  },
};
</script>

<style></style>
