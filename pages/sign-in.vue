<template>
  <b-container class="pt-2 pt-sm-5 d-sm-flex justify-content-center">
    <b-card class="sign-up">
      <h1 class="mb-4">Lamb Sign-In</h1>

      <b-form>
        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="email" type="email" id="email"></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="password">
          <b-form-input v-model="password" type="password" id="password"></b-form-input>
        </b-form-group>

        <div class="d-flex align-items-center">
          <b-button @click="signIn">Sign In</b-button>
          <NuxtLink to="/sign-up" class="ml-3">or sign-up</NuxtLink>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { auth } from '~/plugins/cognito';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async signIn() {
      if (!this.email || !this.password) {
        return this.toast('Invalid details');
      }
      try {
        await auth(this.email, this.password);
        this.$router.push('/');
      } catch (err) {
        this.toast(err.message);
      }
    },

    toast(message, variant = 'danger') {
      this.$bvToast.toast(message, {
        title: 'Lamb Sign-Up',
        appendToast: true,
        variant,
        toaster: 'b-toaster-bottom-center',
      });
    },
  },
};
</script>

<style>
.sign-up {
  min-width: 50%;
}
</style>
