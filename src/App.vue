<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-app-bar app
               flat
               color="#213D4B"

    >
      <div class="nav-bar">
        <span class="text-h5" style="color: white">Магазин инструментов</span>

        <div class="center">
          <router-link to="/catalog">
            <v-btn tile elevation="0">Каталог</v-btn>
          </router-link>

          <router-link to="/account">
            <v-btn tile elevation="0">Личный кабинет</v-btn>
          </router-link>
        </div>

        <div class="right">
          <router-link to="/basket">
            <v-btn tile elevation="0">
              Корзина
              <v-icon class="material-icons-outlined">shopping_cart</v-icon>
            </v-btn>
          </router-link>

          <div v-if="!user" style="display: contents">
            <router-link to="/auth">
              <v-btn tile elevation="0">
                Вход
                <v-icon class="material-icons-outlined">login</v-icon>
              </v-btn>
            </router-link>

            <router-link to="/registration">
              <v-btn tile elevation="0">
                Регистрация
                <v-icon class="material-icons-outlined">person</v-icon>
              </v-btn>
            </router-link>
          </div>

          <router-link v-if="user" to="/catalog">
            <v-btn @click="logout()" tile elevation="0">
              Выход
              <v-icon class="material-icons-outlined">logout</v-icon>
            </v-btn>
          </router-link>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'App',
  data: () => ({
    user: {}
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user
    })
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style scoped>
.nav-bar * {
  text-decoration: none;
  color: inherit;
}

.nav-bar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  background-color: #213D4B;
}

.center {
  justify-self: center;
}

.right {
  justify-self: right;
}
</style>
