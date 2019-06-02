import Vue from 'vue';
import { NavbarPlugin } from 'bootstrap-vue/es/components';
import MegaMenu from './components/MegaMenu.vue';
import scroll from './directives/scroll';
Vue.use(NavbarPlugin);

export default new Vue({
  data: {
    showIcons: false
  },
  components: {
    MegaMenu
  },
  directives: {
    scroll
  },
  methods: {
    testCall(scroll, event) {
      if (scroll) {
        this.showIcons = true;
      } else {
        this.showIcons = false;
      }
    }
  }
});

