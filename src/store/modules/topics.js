/*
* @Author: leopku
* @Date:   2017-06-29 15:57:14
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-24 20:02:23
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
  loading: false,
  isNewTopicVisible: false
}

const getters = {
  topic: state => state.one,
  topics: state => state.all,
  topicLoading: state => state.loading,
  isNewTopicVisible: state => state.isNewTopicVisible
}

const mutations = {
  [types.TOPIC_LOAD] (state) {
    state.loading = true
    state.error = null
  },
  [types.TOPIC_LOAD_SUCCESS] (state, { topics, topic }) {
    state.loading = false
    state.loaded = true
    state.isNewTopicVisible = false

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
  },
  [types.SWITCH_NEW_TOPIC_DIALOG] (state, visible = true) {
    state.isNewTopicVisible = visible
  },
  [types.SHIFT_NEW_TOPIC] (state, topic) {
    console.log(topic, state.all.length)
    state.all.unshift(topic)
    console.log(topic, state.all.length)
  }
}

const actions = {
  create_topic ({ commit }, { title, markdown, content, tags }) {
    commit(types.TOPIC_LOAD)
    return client.createTopic({
      title,
      markdown,
      content,
      tags
    })
      .then(topic => {
        commit(types.TOPIC_LOAD_SUCCESS, { topic })
        return topic
      })
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  },
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
