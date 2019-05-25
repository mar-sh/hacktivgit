<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    if (localStorage.getItem('token')) {
      this.USER_LOGIN();
    } else {
      this.USER_LOGOUT();
    }
  },
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations([
      'USER_LOGIN',
      'USER_LOGOUT',
    ]),
  },
};
</script>
