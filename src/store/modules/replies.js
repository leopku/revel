/*
* @Author: leopku
* @Date:   2017-07-18 20:52:57
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-22 12:22:14
*/

'use strict'

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
  load_replies ({ commit }, { topicId }) {
    commit(types.REPLY_LOAD)
    client.getPointer({
      targetClassName: 'Reply',
      objectId: topicId,
      className: 'Topic',
      where: { '$or': [{downVotedCount: { '$exists': false }}, {downVoted: 0}] },
      order: '-upVotedCount',
      key: 'topic',
      include: 'author'
    })
      .then(replies => commit(types.REPLY_LOAD_SUCCESS, { replies }))
      .catch(error => commit(types.REPLY_LOAD_FAILED, { error }))
  },
  save_reply ({ commit }, { markdown, content, topicId, ACL }) {
    commit(types.REPLY_LOAD)
    client.createReply({
      markdown,
      content,
      topicId
    })
      .then(reply => commit(types.REPLY_LOAD_SUCCESS, { reply }))
      .catch(error => commit(types.REPLY_LOAD_FAILED, { error }))
  },
  vote ({ commit }, { action, replyId }) {
    commit(types.REPLY_LOAD)
    client.voteReply({action, replyId})
      .then(() => commit(types.REPLY_LOAD_SUCCESS))
      .catch(error => commit(types.REPLY_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
