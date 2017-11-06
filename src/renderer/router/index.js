import Vue from 'vue';
import Router from 'vue-router';

import General from '@/components/General';
import Difficulty from '@/components/Difficulty';
import Missions from '@/components/Missions';
import Mods from '@/components/Mods';
import Logging from '@/components/Logging';
import Scripting from '@/components/Scripting';
import Settings from '@/components/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/general'
    },
    {
      path: '/general',
      component: General,
    },
    {
      path: '/difficulty',
      component: Difficulty,
    },
    {
      path: '/missions',
      component: Missions,
    },
    {
      path: '/mods',
      component: Mods
    },
    {
      path: '/logging',
      component: Logging
    },
    {
      path: '/scripting',
      component: Scripting
    },
    {
      path: '/settings',
      component: Settings
    }
  ],
  linkActiveClass: 'is-active',
  scrollBehavior() {
    const configuration = document.getElementsByClassName('configuration')[0];
    if (configuration) {
      setTimeout(() => {
        configuration.scrollTop = 0;
      }, 200);
    }
  }
});
