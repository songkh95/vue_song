import Vue from 'vue'
import Router from 'vue-router'
import Curation from '@/components/Curation'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  mode: 'history', //url에 #제거
  routes: [
    {
      path: '/Curation',
      name: 'Curation',
      component: Curation
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
