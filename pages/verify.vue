<template>
  <b-container class="pt-2 pt-sm-5 d-sm-flex justify-content-center">
    <b-card class="sign-up">
      <h1 class="mb-4">Lamb Verify</h1>

      <b-form>
        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="email" type="email" id="email"></b-form-input>
        </b-form-group>

        <b-form-group label="Verification Code" label-for="code">
          <b-form-input v-model="code" type="text" id="code"></b-form-input>
        </b-form-group>

        <div class="d-flex align-items-center">
          <b-button @click="verify">Verify</b-button>
          <a @click="resendCode" class="ml-3 resend-code">or resend your verification code</a>
        </div>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import { verify, resendCode } from '~/plugins/cognito';

export default {
  data() {
    return {
      email: '',
      code: '',
    };
  },

  mounted() {
    this.email = this.$route.query.email || '';
  },

  methods: {
    async verify() {
      if (!this.code || !this.email) {
        return this.toast('Invalid details');
      }
      try {
        await verify(this.email, this.code);
        this.$router.push('/sign-in');
      } catch (err) {
        this.toast(err.message);
      }
    },

    async resendCode() {
      if (!this.email) {
        return this.toast('Invalid email');
      }
      try {
        await resendCode(this.email);
        this.toast('Verification code email sent', 'success');
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
.resend-code:hover {
  cursor: pointer;
}

.sign-up {
  min-width: 50%;
}
</style>
