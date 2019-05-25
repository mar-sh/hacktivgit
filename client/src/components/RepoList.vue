<template>
  <v-list class="elevation-3" two-line>
    <template v-for="(repo, index) in repos">
      <v-list-tile :key="repo.id" xs12>
        <v-layout row wrap>
          <v-flex xs12 sm3 md2>
            <v-list-tile-content>
              <v-list-tile-title>
                <div class="body-2">Owner: {{ repo.owner }}</div>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <div class="caption grey--text">Last Updated: {{ dateFormat(repo.lastUpdate) }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>

          <v-flex xs12 sm6 md8 pa-3>
            <v-list-tile-content>
              <v-list-tile-title class="v-list__tile--link">
                <div
                  class="subheading text-truncate pr-5 blue--text font-weight-medium"
                  @click.prevent="goToRepoPage(repo.repoUrl)"
                >{{ repo.name }}</div>
              </v-list-tile-title>
              <v-list-tile-sub-title>
                <div
                  class="body-1 text-truncate pr-5 black--text"
                >Description: {{ repo.description }}</div>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-flex>

          <v-flex xs12 sm3 md2 pl-2 align-self-center>
            <v-btn large flat outline color="error" @click.prevent="goDeleteRepo(repo.name)">
              DELETE
              <v-icon right>delete_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-list-tile>
      <v-divider v-if="index < repos.length - 1" :key="`div1-${index}`"></v-divider>
      <v-divider v-if="index < repos.length - 1" :key="`div2-${index}`"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'RepoList',
  props: {
    repos: {
      type: Array,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {},
  methods: {
    ...mapActions(['deleteRepo']),
    dateFormat(date) {
      return moment(date).format('ll');
    },
    goDeleteRepo(repoName) {
      alertify.confirm(
        'Confirm Repo Removal',
        'Are you sure you want to delete this repo ?',
        () => {
          this.deleteRepo(repoName);
          this.$emit('delete-repo', repoName);
          alertify.success('Repo deleted');
        },
        () => {
          alertify.info('Cancelled');
        },
      );
    },
    goToRepoPage(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style>
</style>
