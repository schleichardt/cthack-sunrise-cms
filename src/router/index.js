import Vue from 'vue'
import Router from 'vue-router'
import PageEditor from '@/components/PageEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageEditor',
      component: PageEditor
    }
  ]
})
