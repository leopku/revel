/*
* @Author: leo
* @Date:   2017-06-22 22:55:44
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-05 11:05:40
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
import topics from './modules/topics'
import jumbotron from './modules/jumbotron'

const appName = 'revel'

axios.defaults.baseURL = '/api/v1'
axios.defaults.headers.common['X-Parse-Application-Id'] = appName

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const common = {
  state: {
    unopenning: '无人之地暂不对游人开放'
  }
}

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
    tags,
    topics,
    jumbotron,
    common
  },
  plugins: [createPersistedState({
    key: appName,
    getState: (key) => {
      const user = Cookies.getJSON(key)
      if ((user || {}).sessionToken) {
        Vue.axios.defaults.headers.common['X-Parse-Session-Token'] = user.sessionToken
      }
      return { auth: { user } }
    },
    setState: (key, state) => Cookies.set(key, state.auth.user, { expires: 30 })
  })]
})

export default store
