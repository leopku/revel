/*
* @Author: leo
* @Date:   2017-06-22 22:55:44
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-28 23:57:57
*/

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import auth from './modules/auth'
import tags from './modules/tags'

const appName = 'revel'

axios.defaults.baseURL = '/api/v1'
axios.defaults.headers.common['X-Parse-Application-Id'] = appName

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const getters = {
  isLogin: state => ((state.auth || {}).user || {}).sessionToken
}

const mutations = {}

const actions = {}

const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  modules: {
    auth,
    tags
  },
  plugins: [createPersistedState({
    key: appName,
    getState: (key) => {
      const auth = Cookies.getJSON(key)
      if (((auth || {}).user || {}).sessionToken) {
        Vue.axios.defaults.headers.common['X-Parse-Session-Token'] = auth.user.sessionToken
      }
      return { auth }
    },
    setState: (key, state) => Cookies.set(key, state.auth, { expires: 30 })
  })]
})

export default store
