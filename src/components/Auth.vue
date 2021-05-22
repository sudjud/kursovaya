<template>
  <div class="main-grid">
    <h1 class="text-md-h3">Авторизация</h1>
    <v-text-field v-model="email" label="Почта" outlined></v-text-field>
    <v-text-field v-model="password" label="Пароль" outlined></v-text-field>

    <v-btn color="primary" @click="login()">Войти</v-btn>

    <v-snackbar v-model="snackbar" timeout="3000">
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Auth',
  data: () => ({
    email: '',
    password: '',
    error: '',
    snackbar: false
  }),
  methods: {
    login() {
      console.log(this.email, this.password);
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push('catalog'))
        .catch(e => {
          this.snackbar = true;
          this.error = e.message;
        })
    }
  }
}
</script>

<style scoped>
.main-grid {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 80%;
  grid-auto-columns: minmax(300px, 500px);
}
</style>
