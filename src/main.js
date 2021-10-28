import Vue from 'vue'
// import Toasted from 'vue-toasted';
import VueTippy, { TippyComponent } from "vue-tippy";
import App from './App.vue'
import router from './router'
import store from './store'
import $ from "jquery";

window.$ = $;

Vue.use(VueTippy, {
  directive: "tippy",
  size: 'small',
  distance: 5,
  animation: 'perspective'
});

Vue.component("tippy", TippyComponent);

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
