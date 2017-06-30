/*
* @Author: leopku
* @Date:   2017-06-29 15:57:14
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-30 20:08:18
*/

'use strict'

import { Message } from 'element-ui'
import * as types from '../mutation-types'
import client from '@/client'

const state = {
  all: [],
  limit: 1,
  skip: 0,
  loading: false
}

const getters = {
  topics: state => state.all,
  topicLoading: state => state.loading
}

const mutations = {
  [types.TOPIC_LOAD] (state) {
    state.loading = true
    state.error = null
  },
  [types.TOPIC_LOAD_SUCCESS] (state, { topics }) {
    state.loading = false
    state.loaded = true
    state.all = topics
  },
  [types.TOPIC_LOAD_MORE] (state, { newTopics }) {
    state.loading = false
    state.loaded = true
    state.all.push(...newTopics)
    state.skip = state.skip + state.limit
  },
  [types.TOPIC_LOAD_FAILED] (state, { error }) {
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
  load_more_topics ({ commit, state }, options = {}) {
    commit(types.TOPIC_LOAD)
    let params = options
    console.log(params)
    params['skip'] = state.skip + state.limit
    client.getTopics(params)
      .then(topics => commit(types.TOPIC_LOAD_MORE, { newTopics: topics }))
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  },
  load_topics ({ commit, state }, options = {}) {
    commit(types.TOPIC_LOAD)
    void ['limit', 'skip', 'order', 'include'].forEach(key => {
      if (!options.hasOwnProperty(key) && state.hasOwnProperty(key)) {
        options[key] = state[key]
      }
    })
    // if (!options.limit) { options.limit = state.limit }
    // if (!options.skip) { options.skip = state.skip }
    // if (!options.order) { options.skip = state.skip }
    client.getTopics(options)
      .then(topics => commit(types.TOPIC_LOAD_SUCCESS, { topics }))
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
