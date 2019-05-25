import Vue from 'vue';
import Vuex from 'vuex';
import backend from './api/backend';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: null,
    user: {
      username: '',
      avatar: '',
    },
    repos: [],
    newRepo: {},
  },
  mutations: {
    USER_LOGIN(state) {
      state.authenticated = true;
    },
    USER_LOGOUT(state) {
      state.authenticated = false;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    REMOVE_USER(state) {
      state.user = {
        username: '',
        avatar: '',
      };
    },
    SET_REPOS(state, payload) {
      state.repos = [...payload];
    },
    SET_NEW_REPO(state, payload) {
      state.newRepo = payload;
    },
    ADD_NEW_REPO(state, payload) {
      state.repos.push(payload);
    },
    REMOVE_REPO(state, payload) {
      state.repos = state.repos.filter(repo => repo.name !== payload);
    },
  },
  actions: {
    fetchUserRepos({ commit }) {
      return backend({
        method: 'GET',
        url: 'github/repos',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('SET_REPOS', data);
        })
        .catch((err) => {
          console.log(err);
          alertify.error(err.message);
        });
    },
    deleteRepo({ commit }, payload) {
      backend({
        method: 'DELETE',
        url: '/github/repo',
        data: {
          repo: payload,
        },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(() => {
          commit('REMOVE_REPO', payload);
        })
        .catch((err) => {
          console.log(err);
          alertify.error(err.message);
        });
    },
    addRepo({ commit }, payload) {
      return backend({
        method: 'POST',
        url: '/github/repo',
        data: payload,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log(data, 'data');
          commit('ADD_NEW_REPO', data);
          commit('SET_NEW_REPO', data);
        })
        .catch((err) => {
          console.log(err);
          alertify.error(err.message);
        });
    },
  },
});
