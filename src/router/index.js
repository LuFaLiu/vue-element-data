import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from '../views/sidebar/Navbar.vue'
import index from '../views/Index.vue'

import store from '../store'
import { getSysMenu } from '@/api/commonApi'
import login from '@/views/Login'
import { debounce } from '@/utils/debounceUtil.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Navbar,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页'
        },
        component: index,
      }
    ]
  }, 
  {
    path: '/login',
    name: 'Login',
    component: login
  }

]

const router = new VueRouter({
  mode: 'history',
  //mode: 'hash',
  routes
})


router.beforeEach((to, from, next) => {
  const hasRoute = store.state.menus.hasRoutes;
  const token = sessionStorage.getItem('token');
  if (to.path === '/login') {
    next()
  } else if (!token) {
    next({ path: '/login' })
  } else if (to.path === '/') {
    next({ path: '/index' })
  } else if (token && !hasRoute) { 
    getNavbar(hasRoute)
  }
  next()
})

export const getNavbar = debounce(function(hasRoute) {
  getSysMenu(hasRoute);
}, 300, true)


export default router
