<template>
  <div class="grid">
    <v-card>
      <v-card-title v-if="!authorized">Авторизуйтесь</v-card-title>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>{{ email }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Account',
  data: () => ({
    name: '',
    email: '',
    authorized: false
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.authorized = !!user;

      this.email = user.email;
      this.name = user.displayName;
    })
  }
}
</script>

<style>
.grid {
  display: grid;
  justify-content: center;
  padding: 1rem;
}
</style>
