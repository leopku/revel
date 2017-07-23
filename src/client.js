/*
* @Author: leopku
* @Date:   2017-06-30 16:25:18
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-23 01:47:04
*/

'use strict'

import Vue from 'vue'
import Lazy from 'lazy.js'
// import timezoneJS from 'timezone-js'
// import tz from 'timezone/loaded'
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
    include = 'author,repliedAuthor'
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
          this.getTagsOfTopic(topic)
        }
        return topic
      })
      return topics
    })
}

/**
 * Get tags of a topic
 * @param  {Object} topic what the topic is
 * @return {Promise}
 */
function getTagsOfTopic (topic) {
  topic.tagObject = deepCopy(topic.tags)
  delete topic.tags
  return this.getRelationsRelatedTo({
    targetClass: topic.tagObject.className,
    sourceObject: topic,
    sourceClassName: 'Topic',
    key: 'tags',
    order: '-color'
  })
    .then(tags => Vue.set(topic, 'tags', tags))
    .catch(error => console.log(error.message))
}

function createTopic ({
  title,
  markdown,
  content,
  tags
} = {}) {
  const objects = []
  for (var i = tags.length - 1; i >= 0; i--) {
    tags[i]
    let object = {
      '__type': 'Pointer',
      className: 'Tag',
      objectId: tags[i].value
    }
    objects.push(object)
  }
  return Vue.axios.post('/classes/Topic', {
    title,
    markdown,
    content,
    tags: {
      '__op': 'AddRelation',
      objects
    }
  })
    .then(response => response.data)
}

/**
 * create a reply for a topic
 * @param  {String} options.markdown  markdown as source of reply
 * @param  {String} options.content   html generated from markdown as source of reply
 * @param  {String} options.topicId   objectId of the topic
 * @return {Promise}
 */
function createReply ({
  markdown,
  content,
  topicId
} = {}) {
  const reply = {
    markdown,
    content,
    topic: {
      '__type': 'Pointer',
      className: 'Topic',
      objectId: topicId
    }
  }
  return Vue.axios.post('/classes/Reply', reply)
}

/**
 * voting a reply
 * @param  {String} options.replyId id of a reply
 * @param  {String} options.action  upVote' or 'downVote'
 * @return {Promise}                 [description]
 */
function voteReply ({
  replyId,
  action = 'upVote'
} = {}) {
  return Vue.axios.post(`/functions/vote`, { replyId, action })
}

function getObjects ({
  className,
  where = null,
  limit = 20,
  skip = 0,
  order = '-createdAt',
  include = ''
} = {}) {
  return Vue.axios.get(`/classes/${className}`, {
    params: {
      where,
      limit,
      skip,
      order,
      include
    }
  })
    .then(response => {
      return response
    })
    .then(response => response.data)
    .then(data => data.results)
}

/**
 * Get an object by ID
 * @param  {String} options.objectClass Object class name
 * @param  {String} options.id          ObjectId
 * @return {Promise}
 */
function getObjectById ({
  objectClass,
  id,
  include = ''
}) {
  return Vue.axios.get(`/classes/${objectClass}/${id}`, {
    params: { include }
  })
    .then(response => response.data)
}

/**
 * Get config
 * @return {Promise}
 */
function getConfig () {
  return Vue.axios.get('/config')
    .then(response => response.data)
    .then(data => data.params)
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
 * @param  {String} targetClassName class name of which had a pointer
 * @param  {String} objectId        object id of pointer
 * @param {String} className        class name of pointer
 * @param  {String} key
 * @return {Promise}
 */
function getPointer ({
    targetClassName,
    objectId,
    className,
    key,
    where = {},
    limit = 20,
    skip = 0,
    include = '',
    order = ''
  } = {}) {
  const val = {
    '__type': 'Pointer',
    className,
    objectId
  }
  where[key] = val
  return Vue.axios.get(`/classes/${targetClassName}`, {
    params: {
      where,
      limit,
      skip,
      order,
      include
    }
  })
    .then(response => response.data)
    // .then(data => { console.log(data); return data })
    .then(data => data.results)
}

export default {
  getConfig,
  getTopics,
  createTopic,
  createReply,
  voteReply,
  getObjects,
  getObjectById,
  getTagsOfTopic,
  getRelationsRelatedTo,
  getPointer
}
