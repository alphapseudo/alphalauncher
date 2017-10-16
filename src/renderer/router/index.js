import Vue from 'vue';
import Router from 'vue-router';

import ServerConfig from '@/components/ServerConfig';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/general'
    },
    {
      path: '/general',
      name: 'server-config',
      component: ServerConfig,
    }
  ],
  linkActiveClass: 'is-active'
});
