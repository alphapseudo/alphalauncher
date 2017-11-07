import Vue from 'vue';
import Tippy from 'v-tippy';
import Toasted from 'vue-toasted';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Tippy, {
  size: 'small',
  distance: 5,
  animation: 'perspective'
});

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 4000
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
