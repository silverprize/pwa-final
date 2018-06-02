import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home'
import login from '../pages/login'
import airQuality from '../pages/air.quality'
import chart from '../pages/chart'

import $bus from '../Bus'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/air_quality',
      name: 'Air quality',
      component: airQuality,
      meta: {
        auth: true
      }
    },
    {
      path: '/chart',
      name: 'Chart',
      component: chart,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && $bus.isLogin) {
    next({path: '/'})
  } else if (to.meta.auth && !$bus.isLogin) {
    // redirect
    alert('login 해주세요')
    next({
      path: `/login?redir=${to.fullPath}`
    })
  } else {
    next()
  }
})

export default router
