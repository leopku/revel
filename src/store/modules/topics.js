/*
* @Author: leopku
* @Date:   2017-06-29 15:57:14
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-30 11:10:07
*/

'use strict'

import Vue from 'vue'
import { Message } from 'element-ui'
import { deepCopy } from '@/util'
import * as types from '../mutation-types'

const state = {
  all: [],
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
  test_topics ({ commit }) {
    Vue.axios.get('/classes/Topic', {
      params: {
        include: 'author'
      }
    })
      .then(response => console.log(response.data))
  },
  load_topics ({ commit }) {
    commit(types.TOPIC_LOAD)
    Vue.axios.get('/classes/Topic', {
      params: {
        include: 'author'
      }
    })
      .then(response => response.data)
      .then(data => data.results)
      .then(topicArray => {
        if (!Array.isArray(topicArray)) {
          return Promise.reject(new Error('Result of topics is not an array'))
        }
        if (topicArray.length > 0) {
          const topics = topicArray.map(topic => {
            // load repliedBy
            /* load tags */
            if (topic.tags) {
              topic.tagObject = deepCopy(topic.tags)
              delete topic.tags
              Vue.set(topic, 'tags', [])
              getRelationsRelatedTo(topic.tagObject.className, topic, 'Topic', 'tags')
                .then(results => { topic.tags = results })
                .catch(error => console.log(error.message))
            }

            return topic
          })
          commit(types.TOPIC_LOAD_SUCCESS, { topics })
        } else {
          commit(types.TOPIC_LOAD_SUCCESS, { topics: [] })
        }
      })
      .catch(error => commit(types.TOPIC_LOAD_FAILED, { error }))
  }
}

/**
 * Get target object relations according key of source object.someProp
 *
 * @param {String} targetClass
 * @param {Object} sourceObject
 * @param {String} sourceObjectClass
 * @param {String} key
 * @return {Promise}
 */
function getRelationsRelatedTo (targetClass, sourceObject, sourceObjectClass, key) {
  return Vue.axios.get('/classes/' + targetClass, {
    params: {
      where: {
        '$relatedTo': {
          object: {
            '__type': 'Pointer',
            className: sourceObjectClass,
            objectId: sourceObject.objectId
          },
          key: key
        }
      }
    }
  })
    .then(response => response.data)
    .then(data => data.results)
}

// function getPointer (targetObject /* { className: 'SampleClass'}, objectId: '123456' */, sourceObject, key) {
//   return Vue.axios.get(`/classes/${targetObject.className}/${targetObject.objectId}`)
//       .then(response => response.data)
// }

export default {
  state,
  getters,
  mutations,
  actions
}
