// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import GlobalErrors from './components/GlobalErrors'
import DateTime from './components/DateTime'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.component('GlobalErrors', GlobalErrors)
Vue.component('DateTime', DateTime)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
