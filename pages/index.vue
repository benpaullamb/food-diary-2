<template>
  <b-container>
    <h1>Home</h1>

    <span>Welcome, {{ name }}</span>
  </b-container>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.user?.name || 'user';
    },
  },
};
</script>

<style></style>
