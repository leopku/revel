// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueAnalytics from 'vue-analytics'
import 'element-ui/lib/theme-default/reset.css'
import 'element-ui/lib/theme-default/index.css'
import 'typicons.font/src/font/typicons.css'
import '@/assets/style.scss'
import router from '@/router'
import store from '@/store'
import filters from '@/filters'

Vue.use(ElementUI)
Vue.config.productionTip = false

Object.keys(filters).forEach(filterName => Vue.filter(filterName, filters[filterName]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAnalytics, {
  id: 'UA-6386885-5',
  router
})
