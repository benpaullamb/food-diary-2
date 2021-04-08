<template>
  <b-container class="pt-5">
    <h1 class="mb-4">Sign-Up</h1>

    <b-form>
      <b-form-group label="Name" label-for="name">
        <b-form-input v-model="name" type="text" :state="validation.name.isValid" id="name"></b-form-input>
        <b-form-invalid-feedback>{{ validation.name.errors.join('; ') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Email" label-for="email">
        <b-form-input v-model="email" type="email" :state="validation.email.isValid" id="email"></b-form-input>
        <b-form-invalid-feedback>{{ validation.email.errors.join('; ') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password" label-for="password">
        <b-form-input
          v-model="password"
          type="password"
          :state="validation.password.isValid"
          id="password"
        ></b-form-input>
        <b-form-invalid-feedback>{{ validation.password.errors.join('; ') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Confirm Password" label-for="confirm-password">
        <b-form-input
          v-model="confirmPassword"
          type="password"
          :state="validation.confirmPassword.isValid"
          id="confirm-password"
        ></b-form-input>
        <b-form-invalid-feedback>{{ validation.confirmPassword.errors.join('; ') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-button @click="signUp">Sign-Up</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { signUp } from '~/plugins/cognito';
import formRules from '~/plugins/form-rules';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      validation: {
        name: {
          isValid: null,
          errors: [],
        },
        email: {
          isValid: null,
          errors: [],
        },
        password: {
          isValid: null,
          errors: [],
        },
        confirmPassword: {
          isValid: null,
          errors: [],
        },
      },
    };
  },
  methods: {
    async signUp() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const user = await signUp(this.email, this.password, this.name);
        console.log('user', user);
      } catch (err) {
        console.log(err.message.split('; '));
      }
    },

    validateForm() {
      let isValid = true;

      Object.keys(this.validation).forEach((param) => {
        this.validation[param].errors = [];

        formRules[param]?.forEach((rule) => {
          if (!rule.test(this[param])) {
            this.validation[param].errors.push(rule.failMessage);
            isValid = false;
          }
        });

        this.validation[param].isValid = this.validation[param].errors.length === 0;
      });

      if (this.password !== this.confirmPassword) {
        this.validation.confirmPassword.isValid = false;
        this.validation.confirmPassword.errors = ['Must match password'];
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>

<style></style>
