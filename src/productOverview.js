import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import { CollapsePlugin } from 'bootstrap-vue/es/components';
import ProductItem from './components/ProductItem.vue';

Vue.use(VueLazyLoad);
Vue.use(CollapsePlugin);

export default new Vue({
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