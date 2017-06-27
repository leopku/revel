/*
* @Author: leo
* @Date:   2017-06-23 13:22:20
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-28 01:17:17
*/

'use strict'

import Vue from 'vue'
import { Message, Notification } from 'element-ui'

const mutations = {
  AUTH (state) {
    state.loading = true
    state.error = null
  },
  AUTH_SUCCESS (state, payload) {
    state.loading = false
    state.loaded = true
    state.user = payload.user
    Vue.axios.defaults.headers.common['X-Parse-Session-Token'] = state.user ? state.user.sessionToken : ''
    state.isLoginVisible = false
    state.isSignupVisible = false
    if (payload.action) {
      const msg = payload.action === 'signup' ? '欢迎来到西部世界，请登入核对身份' : '梅芙终于搭乘了离开西部世界的电梯。然而，在她踏上列车时，被眼前的一个景象触动了，梅芙毅然决定回去西部世界，她要。。。'
      if (payload.action === 'logout') {
        Notification.warning({
          message: msg
        })
      } else {
        Message({
          message: msg,
          type: 'success',
          showClose: true
        })
      }
    } else {
      Notification.success({
        message: '多洛丽丝正如往日一样，清晨时分，从梦中醒来，迎接一天美好的开始。'
      })
    }
  },
  AUTH_FAILED (state, { error }) {
    console.dir(error)
    state.loading = false
    state.loaded = false
    state.user = null
    state.error = error.message
    state.isLoginVisible = false
    state.isSignupVisible = false
    Message({
      message: '网络异常，请稍候再试',
      type: 'error',
      duration: 0,
      showClose: true
    })
  }
}

const actions = {
  signup ({ commit, state }, user) {
    commit('AUTH')
    Vue.axios.post('/functions/signup', user)
      // .then(response => response.data)
      .then(user => commit('AUTH_SUCCESS', { user: null, action: 'signup' }))
      .catch(error => commit('AUTH_FAILED', { error }))
  },
  login ({ commit }, user) {
    commit('AUTH')
    return Vue.axios.get('/login', { params: user })
      .then(response => response.data)
      .then(user => commit('AUTH_SUCCESS', { user }))
      .catch(error => commit('AUTH_FAILED', { error }))
  },
  me ({ commit }) {
    commit('AUTH')
    return Vue.axios.get('/users/me')
      .then(response => response.data)
      .then(user => commit('AUTH_SUCCESS', { user }))
      .catch(error => commit('AUTH_FAILED', { error }))
  },
  logout ({ commit }) {
    console.log('logout action')
    commit('AUTH')
    Vue.axios.post('/logout')
      .then(() => commit('AUTH_SUCCESS', { user: null, action: 'logout' }))
      .catch(error => commit('AUTH_FAILED', { error }))
  }
}

export { mutations, actions }
