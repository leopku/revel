/*
* @Author: leo
* @Date:   2017-06-23 13:22:20
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-30 23:53:47
*/

'use strict'

import Vue from 'vue'
import { Message } from 'element-ui'
import * as types from '../mutation-types'

const state = {
  loading: false,
  loaded: false,
  all: []
}

const getters = {
  tagsLoading: state => state.loading,
  tagsLoaded: state => state.loaded,
  tags: state => state.all
}

const mutations = {
  [types.CATEGORY_LOAD] (state) {
    state.loading = true
    state.error = null
  },
  [types.CATEGORY_LOAD_SUCCESS] (state, { tags }) {
    state.loading = false
    state.loaded = true
    state.all = tags
  },
  [types.CATEGORY_LOAD_FAILED] (state, { error }) {
    state.loading = false
    state.loaded = false
    // state.all.length = 0
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
  load_category ({ commit }) {
    commit(types.CATEGORY_LOAD)
    Vue.axios.get('/classes/Tag', {
      params: {
        where: {
          'color': {
            '$exists': true
          }
        }
      }
    })
      .then(response => response.data)
      .then(data => data.results)
      .then(tags => commit(types.CATEGORY_LOAD_SUCCESS, { tags }))
      .catch(error => commit(types.CATEGORY_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
