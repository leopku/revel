/*
* @Author: leopku
* @Date:   2017-06-30 16:25:18
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-01 14:43:55
*/

'use strict'

import Vue from 'vue'
import Lazy from 'lazy.js'
import { deepCopy } from '@/util'

/**
 * @param  {Number} limit
 * @param  {Number} skip
 * @param  {String} order
 * @param  {String} include
 * @return {Promise}
 * @chainable true
 */
function getTopics (
  {
    limit = 20,
    skip = 0,
    order = '-createdAt',
    include = 'author'
  } = {}) {
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
    .then(topics => {
      if (!Array.isArray(topics)) { return Promise.reject(new Error('Result of topics is not an array')) }
      Lazy(topics).each(topic => {
        if (topic.tags) {
          topic.tagObject = deepCopy(topic.tags)
          delete topic.tags
          this.getRelationsRelatedTo({
            targetClass: topic.tagObject.className,
            sourceObject: topic,
            sourceClassName: 'Topic',
            key: 'tags',
            order: '-color'
          })
            .then(tags => Vue.set(topic, 'tags', tags))
            .catch(error => console.log(error.message))
        }
        return topic
      })
      return topics
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
 * @chainable true
 */
function getRelationsRelatedTo (
  {
    targetClass,
    sourceObject,
    sourceClassName,
    key,
    limit = 5, // 5 max
    skip = 0,
    order = '-updatedAt'
  } = {}) {
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

/**
 * @param  {Object} targetObject { className: 'SampleClass', objectId: '123456'}
 * @param  {Object} sourceObject
 * @param  {String} key
 * @return {Promise}
 */
function getPointer (targetObject, sourceObject, key) {
  return Vue.axios.get(`/classes/${targetObject.className}/${targetObject.objectId}`)
      .then(response => response.data)
}

export default {
  getTopics,
  getRelationsRelatedTo,
  getPointer
}
