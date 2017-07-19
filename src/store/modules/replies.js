/*
* @Author: leopku
* @Date:   2017-07-18 20:52:57
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-18 21:31:41
*/

'use strict'

import Vue from 'vue'
import { Message } from 'element-ui'
import * as types from '../mutation-types'
import client from '@/client'

const state = {
  all: [],
  one: null,
  loading: false,
  loaded: false
}

const getters = {
  reply: state => state.one,
  replies: state => state.all,
  replyLoading: state => state.loading
}

const mutations = {
  [types.REPLY_LOAD] (state) {
    state.loading = true
    state.loaded = false
    state.error = null
  },
  [types.REPLY_LOAD_SUCCESS] (state, { replies, reply }) {
    state.loading = false
    state.loaded = true
    if (replies) { state.all = replies }
    if (reply) { state.one = reply }
  },
  [types.REPLY_LOAD_FAILED] (state, { error }) {
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
  save_reply ({ commit }, { markdown, content, topicId }) {
    commit(types.REPLY_LOAD)
    // client.saveReply({
    //   markdown,
    //   content,
    //   topicId
    // })
    //   .then(reply => commit(types.REPLY_LOAD_SUCCESS, { reply }))
    //   .catch(error => commit(types.REPLY_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
