<template>
  <div class="main-grid">
    <h1 class="text-md-h3">Регистрация</h1>
    <v-text-field v-model="name" label="Имя" outlined></v-text-field>
    <v-text-field v-model="email" label="Почта" outlined type="email"></v-text-field>
    <v-text-field v-model="password" label="Пароль" outlined type="password"></v-text-field>
    <v-checkbox label="Согласие на обработку данных"></v-checkbox>

    <v-btn color="primary"
           @click="registration()"
           >
      Зарегистрироваться
    </v-btn>
    <v-snackbar v-model="snackbar" timeout="3000">
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Registration',
  data: () => ({
    name: '',
    email: '',
    password: '',
    error: '',
    snackbar: false
  }),
  methods: {
    registration() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(result => result.user.updateProfile({
          displayName: this.name
        }))
        .then(() => this.$router.push('catalog'))
        .catch(e => {
          this.snackbar = true;
          this.error = e.message;
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-grid {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 80%;
  grid-auto-columns: minmax(300px, 500px);
}
</style>
