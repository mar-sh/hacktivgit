<template>
  <v-toolbar app flat dense color="black" dark>
    <v-avatar v-if="user.avatar" class="py-1" tile :size="48" color="grey lighten-4">
      <img :src="user.avatar" alt="avatar">
    </v-avatar>
    <v-toolbar-title class="v-list__tile--link" @click.prevent="goHomePage">HacktivGit</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat v-show="!authenticated" :href="githubHref">
        <span class="pr-1">Login</span>
        <i class="fab fa-github fa-lg"></i>
      </v-btn>
      <v-btn v-show="authenticated" flat @click.prevent="userLogout">
        <span>Logout</span>
        <i class="material-icons">exit_to_app</i>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import backend from "@/api/backend";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      displayAvatar: true
    };
  },
  methods: {
    ...mapMutations(["USER_LOGOUT", "REMOVE_USER"]),
    userLogout() {
      backend({
        method: "GET",
        url: "http://localhost:3000/oauth/github/logout",
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(() => {
          this.USER_LOGOUT();
          this.REMOVE_USER();
          localStorage.clear();
          alertify.success("Bye!");
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          alertify.error(err.message);
        });
    },
    goHomePage() {
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    ...mapState(["authenticated", "user"]),
    githubHref() {
      return `https://github.com/login/oauth/authorize?client_id=${
        process.env.VUE_APP_GITHUB_CLIENT_ID
      }&scope=user%20repo%20delete_repo`;
    },
  },
};
</script>

<style>
</style>
