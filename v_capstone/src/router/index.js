import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history', //url에 #제거
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
