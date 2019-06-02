import Vue from 'vue';
import AOS from 'aos';

AOS.init();


import headerApp from './header.js';
import navApp from './nav.js';
import pageApp from './page.js';
import productOverview from './productOverview.js';

mountApp(headerApp, '#header');
mountApp(navApp, '#main-nav');
mountApp(pageApp, '#pageApp');
mountApp(productOverview, '#productOverview');


function mountApp(app,id) {
  if(document.querySelector(id)) {
    app.$mount(id);
  }
}
