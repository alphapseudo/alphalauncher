// TODO Fix references
// import Vue from 'vue';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Tippy from 'v-tippy';
// import Toasted from 'vue-toasted';

// Vue.use(Tippy, {
//   size: 'small',
//   distance: 5,
//   animation: 'perspective'
// });

// Vue.use(Toasted, {
//   position: 'bottom-right',
//   duration: 4000
// });

createApp(App).use(store).use(router).mount('#app')
