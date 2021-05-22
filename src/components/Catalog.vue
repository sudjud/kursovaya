<template>
  <div class="main-grid">
    <div style="position: relative">
      <div class="filters-grid">
        Цена
        <div class="row">
          <v-text-field v-model="from" outlined label="От"></v-text-field>
          <v-text-field v-model="to" outlined label="До"></v-text-field>
        </div>

        Сортировка
        <div class="row">
          <v-btn text @click="changeSorting('price')">
            Цена
            <v-icon v-if="price !== null">{{ price === 'asc' ? 'expand_less' : 'expand_more' }}</v-icon>
          </v-btn>
          <v-btn text @click="changeSorting('name')">
            Название
            <v-icon v-if="name !== null">{{ name === 'asc' ? 'expand_less' : 'expand_more' }}</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div class="cards-grid">
      <v-card outlined v-for="item in goods" v-bind:key="item.name">
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.price }}р.</v-card-subtitle>
        <v-img :src="item.photo" contain height="200px"></v-img>
        <v-card-text>{{ item.description }}</v-card-text>
        <v-card-actions>
          <v-btn @click="addToBasket(item.id)" outlined color="primary">
            В корзину
            <v-icon>add_shopping_cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'Catalog',
  data: () => ({
    defaultGoods: [],
    from: 0,
    to: 99999,
    price: null,
    name: null
  }),
  methods: {
    async getGoods() {
      const ref = await firebase.database().ref('goods').once('value');

      const value = ref.val();
      const keys = Object.keys(value);
      this.defaultGoods = keys.map(k => ({ ...value[k], id: k }))
      // console.log(this.goods);
    },
    addToBasket(id) {
      const basketKey = 'basket';
      const currentBasket = JSON.parse(localStorage.getItem(basketKey));
      localStorage.setItem(basketKey, JSON.stringify([...(currentBasket || []), id]))
    },
    changeSorting(field) {
      field !== 'price' ? this.price = null : this.name = null

      if (this[field] === null) {
        this[field] = 'asc';
        return;
      }

      if (this[field] === 'asc') {
        this[field] = 'desc';
        return;
      }

      if (this[field] === 'desc') {
        this[field] = null;
      }
    }
  },
  computed: {
    goods: function () {
      const filtered = this.defaultGoods.filter(g => g.price > this.from && g.price < this.to )

      filtered.sort((a, b) => {
        if (this.price === 'asc') {
          return a.price > b.price ? 1 : -1;
        }

        if (this.price === 'desc') {
          return a.price < b.price ? 1 : -1;
        }

        if (this.name === 'asc') {
          return a.name > b.name ? 1 : -1;
        }

        if (this.name === 'desc') {
          return a.name < b.name ? 1 : -1;
        }
      });

      console.log(filtered)
      return filtered;
    }
  },
  created() {
    this.getGoods();
  }
}
</script>

<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-gap: 30px;
  padding: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}

.filters-grid {
  position: fixed;
  padding: 1rem;
  display: grid;
  grid-gap: 10px;
  align-content: center;
}

.row {
  display: flex;
  grid-gap: 5px;
  align-items: center;
}
</style>
