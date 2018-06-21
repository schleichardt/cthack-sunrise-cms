import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import PageEditor from '@/components/PageEditor'
import PageList from '@/components/PageList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageList',
      component: PageList
    },
    {
      path: '/page/:pageKey',
      name: 'PageEditor',
      component: PageEditor
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
