<template>
  <v-container fluid fill-height>
    <v-layout column wrap align-center>
      <p id="message" class="text-xs-center">Redirecting </p>
      <div>
        <rise-loader class="text-center" :color="'grey'" :size="'50px'"></rise-loader>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import backend from '@/api/backend';
import RiseLoader from 'vue-spinner/src/RiseLoader.vue';

export default {
  name: 'Login',
  components: {
    RiseLoader,
  },
  created() {
    this.userLogin();
  },
  methods: {
    ...mapMutations(['USER_LOGIN', 'SET_USER']),
    userLogin() {
      const code = this.$route.fullPath.split('=')[1];
      this.USER_LOGIN();
      backend({
        method: 'POST',
        url: 'http://localhost:3000/oauth/github/login',
        data: {
          code,
        },
      })
        .then(({ data }) => {
          // localStorage.setItem('avatar', data.currentUser.avatar);
          // localStorage.setItem('username', data.currentUser.username);
          this.SET_USER(data.currentUser)
          localStorage.setItem('token', data.accessToken);
          alertify.success('Welcome to Hacktivgit!');
          this.$router.push({ name: 'home' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#message {
  font-size: 100px;
  color: black;
  font-family: "Courier New", Courier, monospace;
}
</style>
