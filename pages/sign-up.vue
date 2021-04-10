<template>
  <b-container class="pt-2 pt-sm-5 d-sm-flex justify-content-center">
    <b-card class="sign-up">
      <h1 class="mb-4">Lamb Sign-Up</h1>

      <b-form>
        <b-form-group label="Name" label-for="name">
          <b-form-input v-model="name" type="text" id="name"></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="email" type="email" id="email"></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="password">
          <b-form-input v-model="password" type="password" id="password"></b-form-input>
        </b-form-group>

        <b-form-group label="Confirm Password" label-for="confirm-password">
          <b-form-input v-model="confirmPassword" type="password" id="confirm-password"></b-form-input>
        </b-form-group>

        <div class="d-flex align-items-center">
          <b-button variant="primary" @click="signUp">Sign-Up</b-button>
          <NuxtLink to="/verify" class="ml-3">or verify your account</NuxtLink>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { signUp } from '~/plugins/cognito';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },

  methods: {
    async signUp() {
      if (!this.validateForm()) {
        return this.errorToast('Invalid details');
      }

      try {
        const user = await signUp(this.email, this.password, this.name);
        if (user) {
          this.$router.push({ path: 'verify', query: { email: this.email } });
        }
      } catch (err) {
        this.errorToast(err.message);
      }
    },

    validateForm() {
      const validName = this.name.length >= 1;
      const validEmail = this.email.match(/\w+@\w+/gi);
      const validPassword = this.validatePassword(this.password);
      const validConfirmPass = this.validatePassword(this.confirmPassword) && this.password === this.confirmPassword;
      return validName && validEmail && validPassword && validConfirmPass;
    },

    validatePassword(password) {
      return password.length >= 8 && password.match(/[A-Z]/g) && password.match(/[a-z]/g) && password.match(/\d/gi);
    },

    errorToast(message) {
      this.$bvToast.toast(message, {
        title: 'Lamb Sign-Up',
        appendToast: true,
        variant: 'danger',
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
