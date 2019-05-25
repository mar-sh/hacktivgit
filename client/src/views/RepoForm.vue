<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-3">
          <v-card-title id="form-card" primary-title class="grey">
            <v-icon class="text-xs-center pr-3" right @click="closeForm">close</v-icon>
            <h3 class="headline font-weight-regular black--text">New repo</h3>
          </v-card-title>
          <v-card-text style="padding-top:5px;">
            <v-form flat border @submit.prevent="addNewRepo">
              <v-text-field prepend-icon="inbox" v-model="name" label="name"></v-text-field>
              <v-text-field prepend-icon="description" v-model="description" label="description"></v-text-field>
              <v-switch :prepend-icon="statusIcon" v-model="status" :label="`Private: ${status.toString()}`"></v-switch>
              <v-btn flat outline small @click.prevent="addNewRepo">Create a new repo</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RepoForm',
  data() {
    return {
      name: '',
      description: '',
      status: false,
      newRepo: {},
    };
  },
  methods: {
    ...mapActions([
      'addRepo',
    ]),
    closeForm() {
      this.$router.push({ name: 'home' });
    },
    addNewRepo() {
      const newRepo = {
        name: this.name,
        description: this.description,
        status: this.status,
      };
      this.$emit('add-repo', newRepo);
      this.closeForm();
    },
  },
  computed: {
    statusIcon() {
      return this.status ? 'lock' : 'lock_open'
    }
  }
};
</script>

<style>
#form-card {
  padding-left: 0;
}
</style>
