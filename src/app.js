import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import Slick from 'vue-slick';

Vue.use(VueLazyLoad);

import MegaMenu from './components/MegaMenu.vue';

const nav = new Vue({
  components: {
    MegaMenu
  }
});

if(document.querySelector('#navApp')) {
  nav.$mount('#navApp');
}


const page = new Vue({
  delimiters: ['{[',']}'],
  components: {
    Slick
  }
});

if (document.querySelector('#page-app')) {
  page.$mount('#page-app');
}

import ProductItem from './components/ProductItem.vue';

const product = new Vue({
  delimiters: ['{[',']}'],
  data: {
    currentCategory: '',
  },
  mounted() {
    window.addEventListener('hashchange', this.hashChanged);
    if(window.location.hash) this.hashChanged();
  },
  methods: {
    selectCategory(category) {
      window.location.hash = category;
    },
    hashChanged() {
      this.currentCategory = window.location.hash.substr(1);
    }
  },
  computed: {
    currentCategoryText() {
      return this.currentCategory.replace(/-/g, ' ');
    }
  },
  components: {
    ProductItem
  }
});

if (document.querySelector('#product-overview')) {
  product.$mount('#product-overview')
}