/*
* @Author: leopku
* @Date:   2017-07-05 09:21:37
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-05 14:08:19
*/

'use strict'

// import Vue from 'vue'
import { Message } from 'element-ui'
import { JUMBOTRON_LOAD, JUMBOTRON_LOAD_SUCCESS, JUMBOTRON_LOAD_FAILED } from '../mutation-types'
import client from '@/client'

const state = {
  config: {
    forumTitle: null,
    forumDescription: null
  },
  loading: false,
  loaded: false
}

const getters = {
  config: state => state.config
}

const mutations = {
  [JUMBOTRON_LOAD] (state) {
    state.loading = true
    state.error = false
  },
  [JUMBOTRON_LOAD_SUCCESS] (state, { config }) {
    state.loading = false
    state.loaded = true
    state.config = config
  },
  [JUMBOTRON_LOAD_FAILED] (state, { error }) {
    state.loading = false
    state.loaded = false
    state.error = error.message
    Message({
      message: '网络异常，请稍候再试',
      type: 'error',
      duration: 0,
      showClose: true
    })
  }
}

const actions = {
  load_jumbotron ({ commit }) {
    commit(JUMBOTRON_LOAD)
    client.getConfig()
      .then(config => commit(JUMBOTRON_LOAD_SUCCESS, { config }))
      .catch(error => commit(JUMBOTRON_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
