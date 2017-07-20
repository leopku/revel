/*
* @Author: leopku
* @Date:   2017-06-29 15:57:14
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-20 14:39:28
*/

'use strict'

import Vue from 'vue'
import Lazy from 'lazy.js'
import { Message } from 'element-ui'
import * as types from '../mutation-types'
import client from '@/client'

const state = {
  all: [],
  one: { tags: [] },
  limit: 10,
  skip: 0,
  loading: false
}

const getters = {
  topic: state => state.one,
  topics: state => state.all,
  topicLoading: state => state.loading
}

const mutations = {
  [types.TOPIC_LOAD] (state) {
    state.loading = true
    state.error = null
  },
  [types.TOPIC_LOAD_SUCCESS] (state, { topics, topic }) {
    state.loading = false
    state.loaded = true
    if (topics) { state.all = topics }
    if (topic) { state.one = topic }
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
  },
  [types.TOPIC_RESORT] (state,
    {
      field = 'createdAt',
      descend = false
    } = {}) {
    const newTopics = Lazy(state.all).sortBy(topic => topic[field], descend).toArray()

    Vue.set(state, 'all', newTopics)
  }
}

const actions = {
  load_more_topics ({ commit, state }, options = {}) {
    commit(types.TOPIC_LOAD)
    let params = options
    params['skip'] = state.skip + state.limit
    client.getTopics(params)
      .then(topics => commit(types.TOPIC_LOAD_MORE, { newTopics: topics }))
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  },
  load_topics ({ commit, state }, options = {}) {
    commit(types.TOPIC_LOAD)
    Lazy(['limit', 'skip', 'order', 'include']).each(item => {
      if (!options.hasOwnProperty(item) && state.hasOwnProperty(item)) {
        options[item] = state[item]
      }
    })
    client.getTopics(options)
      .then(topics => commit(types.TOPIC_LOAD_SUCCESS, { topics }))
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  },
  load_topic ({ commit }, { id }) {
    commit(types.TOPIC_LOAD)
    client.getObjectById({
      id,
      objectClass: 'Topic',
      include: 'author'
    })
      .then(topic => {
        client.getTagsOfTopic(topic)
        // client.getRelationsRelatedTo({
        //   targetClass: 'Reply',
        //   sourceObject: topic,
        //   sourceClassName: 'Topic',
        //   key: 'topic'
        // })
        //   .then(replies => console.log(`** ${replies} **`))
        client.getPointer({
          targetClassName: 'Reply',
          sourceObject: topic,
          sourceClassName: 'Topic',
          key: 'topic',
          where: { '$or': [{downVotedCount: { '$exists': false }}, {downVoted: 0}] },
          order: '-upVoted'
        })
          .then(replies => Vue.set(topic, 'replies', replies))
          .catch(() => Message({
            message: '回复加载失败',
            type: 'error',
            showClose: true
          }))
        return topic
      })
      .then(topic => commit(types.TOPIC_LOAD_SUCCESS, { topic }))
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  },
  sort_topics ({ commit }, order) {
    commit(types.TOPIC_RESORT, order)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
