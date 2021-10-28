import Vue from 'vue'
import VueRouter from 'vue-router'

import General from '@/views/General';
import Difficulty from '@/views/Difficulty';
import Missions from '@/views/Missions';
import Mods from '@/views/Mods';
import Logging from '@/views/Logging';
import Scripting from '@/views/Scripting';
import Settings from '@/views/Settings';

Vue.use(VueRouter)

const routes = [
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
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  scrollBehavior() {
    const configuration = document.getElementsByClassName('configuration')[0];
    if (configuration) {
      setTimeout(() => {
        configuration.scrollTop = 0;
      }, 200);
    }
  }
})

export default router
