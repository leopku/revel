/*
* @Author: leo
* @Date:   2017-06-23 13:22:20
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-26 10:28:16
*/

'use strict'

import Vue from 'vue'
import { Message } from 'element-ui'
import * as types from '../mutation-types'

const state = {
  loading: false,
  loaded: false,
  all: [],
  one: null
}

const getters = {
  tagsLoading: state => state.loading,
  tagsLoaded: state => state.loaded,
  tags: state => state.all,
  category: state => state.one
}

const mutations = {
  [types.CATEGORY_LOAD] (state) {
    state.loading = true
    state.error = null
  },
  [types.CATEGORY_LOAD_SUCCESS] (state, { categories, category }) {
    state.loading = false
    state.loaded = true
    state.all = categories
    if (categories) { state.all = categories }
    if (category) { state.one = category }
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
  load_category ({ commit }, { categoryId }) {
    commit(types.CATEGORY_LOAD)
    return Vue.axios.get(`/classes/Tag/${categoryId}`)
      .then(response => {
        console.log(response)
        return response.data
      })
      .then(category => {
        commit(types.CATEGORY_LOAD_SUCCESS, { category })
        return category
      })
      .catch(error => commit(types.CATEGORY_LOAD_FAILED, { error }))
  },
  load_categories ({ commit }) {
    commit(types.CATEGORY_LOAD)
    return Vue.axios.get('/classes/Tag', {
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
      .then(categories => {
        commit(types.CATEGORY_LOAD_SUCCESS, { categories })
        return categories
      })
      .catch(error => commit(types.CATEGORY_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
