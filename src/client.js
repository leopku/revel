/*
* @Author: leopku
* @Date:   2017-06-30 16:25:18
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-30 18:52:47
*/

'use strict'

import Vue from 'vue'
import { deepCopy } from '@/util'

function getTopics (
  {
    limit = 20,
    skip = 0,
    order = '-createdAt',
    include = 'author'
  } = {}
) {
  return Vue.axios.get('/classes/Topic', {
    params: {
      limit,
      skip,
      order,
      include
    }
  })
    .then(response => response.data)
    .then(data => data.results)
    .then(topicArray => {
      if (!Array.isArray(topicArray)) {
        return Promise.reject(new Error('Result of topics is not an array'))
      }
      let result = []
      if (topicArray.length > 0) {
        const topics = topicArray.map(topic => {
          // load repliedBy
          /* load tags */
          if (topic.tags) {
            topic.tagObject = deepCopy(topic.tags)
            delete topic.tags
            Vue.set(topic, 'tags', [])
            getRelationsRelatedTo({
              targetClass: topic.tagObject.className,
              sourceObject: topic,
              sourceClassName: 'Topic',
              key: 'tags',
              order: '-color'
            })
              .then(results => { topic.tags = results })
              .catch(error => console.log(error.message))
          }

          return topic
        })
        result = topics
      //   commit(types.TOPIC_LOAD_SUCCESS, { topics })
      // } else {
      //   commit(types.TOPIC_LOAD_SUCCESS, { topics: [] })
      }
      return result
    })
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
function getRelationsRelatedTo (
  {
    targetClass,
    sourceObject,
    sourceClassName,
    key,
    limit = 5, // 5 max
    skip = 0,
    order = 'updatedAt'
  } = {}) {
  console.log('///***///')
  const params = {
    order,
    limit,
    skip,
    where: {
      '$relatedTo': {
        object: {
          '__type': 'Pointer',
          className: sourceClassName,
          objectId: sourceObject.objectId
        },
        key: key
      }
    }
  }

  return Vue.axios.get('/classes/' + targetClass, { params })
    .then(response => response.data)
    .then(data => data.results)
}

function getPointer (targetObject /* { className: 'SampleClass'}, objectId: '123456' */, sourceObject, key) {
  return Vue.axios.get(`/classes/${targetObject.className}/${targetObject.objectId}`)
      .then(response => response.data)
}

export default {
  getTopics,
  getRelationsRelatedTo,
  getPointer
}
