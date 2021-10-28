import Vue from 'vue'
// import Tippy from 'v-tippy';
// import Toasted from 'vue-toasted';
import App from './App.vue'
import router from './router'
import store from './store'

// TODO Re-enabled these plugins
// Vue.use(Tippy, {
//   size: 'small',
//   distance: 5,
//   animation: 'perspective'
// });

// Vue.use(Toasted, {
//   position: 'bottom-right',
//   duration: 4000
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
