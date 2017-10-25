import Vue from 'vue';
import Router from 'vue-router';

import ServerConfig from '@/components/ServerConfig';
import Difficulty from '@/components/Difficulty';
import Missions from '@/components/Missions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/general'
    },
    {
      path: '/general',
      component: ServerConfig,
    },
    {
      path: '/difficulty',
      component: Difficulty,
    },
    {
      path: '/missions',
      component: Missions,
    }
  ],
  linkActiveClass: 'is-active',
  scrollBehavior() {
    document.getElementsByClassName('configuration')[0].scrollTop = 0;
  }
});
