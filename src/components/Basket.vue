<template>
  <div class="main-grid">
    <div class="cards-grid">
      <span style="text-align: center" class="text-h3" v-if="goods.length === 0">Корзина пуста</span>

      <v-card outlined v-for="item in goods" v-bind:key="item.id">
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.price }}р.</v-card-subtitle>
        <v-img contain v-bind:src="item.photo" height="200px"></v-img>
        <v-card-text>{{ item.description }}</v-card-text>
        <v-card-actions class="buttons">
          <v-btn @click="remove(item.id)" outlined color="error">
            Удалить
            <v-icon class="material-icons-outlined">delete</v-icon>
          </v-btn>

          <div>
            <v-btn @click="minus(item.id)" text>-</v-btn>
            {{ item.count }}
            <v-btn @click="plus(item.id)" text>+</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>

    <div style="position: relative">
      <div class="buy-card">
        <v-card>
          <v-card-title>{{ totalPrice }}р.</v-card-title>
          <v-card-text>
            <v-text-field outlined label="Адрес"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="accept()" outlined color="primary">
              Оформить
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <v-snackbar v-model="snackbar" timeout="3000">
      Заказ оформлен
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Basket',
  data: () => ({
    goods: [],
    snackbar: false
  }),
  methods: {
    async getBasket() {
      const itemIds = JSON.parse(localStorage.getItem('basket'));
      console.log(itemIds);

      const ref = await firebase.database().ref('goods').once('value');

      const value = ref.val();
      const keys = Object.keys(value);
      this.goods = keys
        .filter(k => itemIds.includes(k))
        .map(k => ({ ...value[k], id: k, count: 1 }));

      console.log(this.goods);
    },
    plus(id) {
      const good = this.goods.find(g => g.id === id);
      good.count += 1;
    },
    minus(id) {
      const good = this.goods.find(g => g.id === id);

      if (good.count < 1) {
        return;
      }

      good.count -= 1;
    },
    remove(id) {
      this.goods = this.goods.filter(g => g.id !== id);
      localStorage.setItem('basket', JSON.stringify(this.goods.map(g => g.id)))
    },
    accept() {
      this.snackbar = true;
      this.goods = [];
      localStorage.removeItem('basket');
    }
  },
  computed: {
    totalPrice: function () {
      return this.goods.reduce((prev, curr) => prev += curr.price * curr.count, 0)
    }
  },
  created() {
    this.getBasket();
  }
}
</script>

<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 30px;
  padding: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}

.buy-card {
  position: fixed;
  padding: 1rem;
  display: grid;
  grid-gap: 10px;
  align-content: center;
  width: 300px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons div * {
  font-size: 20px
}
</style>
