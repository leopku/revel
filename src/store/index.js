/*
* @Author: leo
* @Date:   2017-06-22 22:55:44
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-27 23:27:07
*/

'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const appName = 'revel'

// axios.defaults.baseURL = '/api/v1'
axios.defaults.baseURL = 'http://localhost:5000/parse'
axios.defaults.headers.common['X-Parse-Application-Id'] = appName

import { mutations as authMutations, actions as authActions } from './auth'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const state = {
  test: 0,
  loaded: false,
  loading: false,
  user: null,
  isSignupVisible: false,
  isLoginVisible: false
}

const mutations = {
  ...authMutations
}

const actions = {
  ...authActions
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState({
    key: appName,
    getState: (key) => {
      const user = Cookies.getJSON(key)
      if ((user || {}).sessionToken) {
        Vue.axios.defaults.headers.common['X-Parse-Session-Token'] = user.sessionToken
      }
      return { user }
    },
    setState: (key, state) => Cookies.set(key, state.user, { expires: 30 })
  })]
})

export default store
