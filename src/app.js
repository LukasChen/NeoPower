import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import Slick from 'vue-slick';
import { CollapsePlugin, ModalPlugin, NavbarPlugin } from 'bootstrap-vue/es/components'
import AOS from 'aos';

AOS.init();

Vue.use(VueLazyLoad);
Vue.use(CollapsePlugin);
Vue.use(ModalPlugin);
Vue.use(NavbarPlugin);

const header = new Vue({});

if (document.querySelector('#header')) {
  header.$mount('#header');
}

import MegaMenu from './components/MegaMenu.vue';

const nav = new Vue({
  components: {
    MegaMenu
  }
});

if(document.querySelector('#main-nav')) {
  nav.$mount('#main-nav');
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
    categoryCollapseVisible: false
  },
  mounted() {
    window.addEventListener('hashchange', this.hashChanged);
    if(window.location.hash) this.hashChanged();
  },
  methods: {
    selectCategory(category) {
      window.location.hash = category;
      this.categoryCollapseVisible = false;
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