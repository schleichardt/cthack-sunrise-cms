// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import GlobalErrors from './components/GlobalErrors'
import DateTime from './components/DateTime'
import ObjectFieldEditor from './components/ObjectFieldEditor'
import StringFieldEditor from './components/StringFieldEditor'
import ArrayFieldEditor from './components/ArrayFieldEditor'
import EntryEditor from './components/EntryEditor'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

// for recursive components they have to be registered here
Vue.component('GlobalErrors', GlobalErrors)
Vue.component('DateTime', DateTime)
Vue.component('EntryEditor', EntryEditor)
Vue.component('ObjectFieldEditor', ObjectFieldEditor)
Vue.component('StringFieldEditor', StringFieldEditor)
Vue.component('ArrayFieldEditor', ArrayFieldEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
