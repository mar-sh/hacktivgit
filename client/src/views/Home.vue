<template>
  <v-container fluid>
    <v-layout id="main" row wrap justify-center>
      <v-flex xs9>
        <v-layout row wrap align-center justify-space-around>
          <v-flex xs12 md10 >
            <h1 class="display-1 font-weight-light pr-5">{{ user.username }}</h1>
          </v-flex>
          <v-flex class="pl-3 pb-2" xs6 md2 :align-self-center="true">
            <v-btn small flat outline @click.prevent="getForm">Add Repo</v-btn>
          </v-flex>
        </v-layout>
        <v-divider class="pr-3"></v-divider>

        <v-container fluid v-if="!isLoading">
          <v-layout row wrap>
            <v-flex xs12 md8 :align-self-center="true">
              <v-form @submit.prevent="getSearch">
                <v-text-field
                  clearable
                  full-width
                  v-model="searchQuery"
                  append-outer-icon="search"
                  box
                  label="Search repos..."
                ></v-text-field>
              </v-form>
            </v-flex>
            <v-flex xs12>
              <RepoList :repos="displayRepos" @delete-repo="filterDeleted"></RepoList>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs3 px-4 align-self-start>
        <router-view @add-repo="createRepo"></router-view>
      </v-flex>
    </v-layout>

    <v-container fluid fill-height v-if="isLoading">
      <v-layout align-center justify-center>
        <div>
          <rise-loader :color="'grey'" :size="'50px'"></rise-loader>
        </div>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RepoList from "@/components/RepoList.vue";
import RiseLoader from "vue-spinner/src/RiseLoader.vue";

export default {
  name: "home",
  components: {
    RepoList,
    RiseLoader
  },
  data() {
    return {
      userRepos: [],
      search: null,
      searchQuery: "",
      isLoading: false
    };
  },
  created() {
    this.isLoading = true;
    this.fetchUserRepos().then(() => {
      this.search = null;
      this.userRepos = [...this.repos];
      this.isLoading = false;
    });
  },
  methods: {
    ...mapActions(["fetchUserRepos", "addRepo"]),
    getSearch() {
      if (this.searchQuery) {
        const regex = new RegExp(this.searchQuery, "ig");
        this.search = this.userRepos.filter(repo => repo.name.match(regex));
      } else {
        this.search = null;
      }
    },
    clearSearch() {
      this.searchQuery = "";
      this.search = null;
    },
    getForm() {
      this.$router.push({ name: "new-repo" });
    },
    filterDeleted(repoName) {
      if (this.search) {
        this.search = null;
        this.userRepos = this.userRepos.filter(repo => repo.name !== repoName);
      } else {
        this.userRepos = this.userRepos.filter(repo => repo.name !== repoName);
      }
    },
    createRepo(repo) {
      this.addRepo(repo).then(() => {
        alertify.success("Added a new repo!");
        this.userRepos.push(this.newRepo);
      });
    }
  },
  computed: {
    ...mapState(["repos", "newRepo", "user"]),
    displayRepos() {
      return this.search
        ? this.search.sort(
            (a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)
          )
        : this.userRepos.sort(
            (a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)
          );
    },
    username() {
      return localStorage.getItem("username");
    },
    avatar() {
      return localStorage.getItem("avatar");
    }
  },
  watch: {
    searchQuery: {
      handler: "getSearch"
    }
  }
};
</script>
