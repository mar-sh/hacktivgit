<template>
  <v-container id="front">
    <v-layout column wrap align-center justify-center>
      <p class="black--text text-xs-center">LOGIN</p>

      <div>
        <i class="material-icons pr-2">arrow_forward</i>
        <i class="fab fa-github v-list__tile--link" @click="goGithubLogin"></i>
        <i class="material-icons pl-2">arrow_back</i>
      </div>
      <p class="black--text text-xs-center">FIRST</p>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    goGithubLogin() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&scope=user%20repo%20delete_repo`;
    },
  },
};
</script>

<style scoped>
#front {
  font-size: 100px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}
</style>
