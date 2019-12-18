// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import axios from 'axios'
import $ from 'jquery'

Vue.use(VModal);
axios.defaults.baseURL = '/api';
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  $
});

export {App, router, store}
