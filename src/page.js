import Vue from 'vue';
import Slick from 'vue-slick';
import Product from './components/Product.vue';

export default new Vue({
  delimiters: ['{[',']}'],
  components: {
    Slick,
    Product
  }
});