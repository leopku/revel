/*
* @Author: leopku
* @Date:   2017-06-27 19:20:30
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-23 14:47:27
*/
'use strict'

const { useMasterKey, defaultACL } = require('./util')

/* global Parse */
Parse.Cloud.define('hello', (req, res) => {
  const query = new Parse.Query('Vote')
  // query.equalTo('upVotedBy', new Parse.User({ objectId: 'fi5pHA9iEm' }))
  query.get('r8ZQ8VXY0R')
    .then(vote => {
      const relation = vote.relation('upVotedBy')
      // relation.equalTo('objectId', 'fi5pHA9iEm')
      const relationQuery = relation.query()
      relationQuery.equalTo('objectId', 'fi5pHA9iEm')
      relationQuery.find({useMasterKey})
        .then(results => {
          res.success('Hi')
        })
        .catch(error => res.error(error))
    })
    .catch(error => res.error(error))
})

Parse.Cloud.define('signup', (req, res) => {
  let user = new Parse.User()
  user.set('username', req.params.username)
  user.set('email', req.params.email)
  user.set('password', req.params.password)
  user.signUp(null, {useMasterKey})
    .then(response => res.success(response))
    .catch(error => res.error(error))
})

Parse.Cloud.define('vote', (req, res) => {
  if (!req.params.replyId || !req.user) {
    res.success('Vote successfully')
    return
  }
  const action = req.params.action || 'upVote'
  const replyQuery = new Parse.Query('Reply')
  replyQuery.get(req.params.replyId)
    .then(reply => {
      const relation = reply.relation(`${action}edBy`)
      const relationQuery = relation.query()
      relationQuery.equalTo('objectId', req.user.id)
      relationQuery.find({useMasterKey})
        .then(results => {
          if (results.length === 0) {
            relation.add(req.user)
            reply.increment(`${action}edCount`)
          } else {
            relation.remove(req.user)
            reply.decrement(`${action}edCount`)
          }
          reply.save(null, {useMasterKey})
            .then(result => res.success(result))
            .catch(error => res.error(error))
        })
    })
    .then(result => res.success(result))
    .catch(error => res.error(error))
})

Parse.Cloud.beforeSave('Reply', (req, res) => {
  const user = req.user
  if (req.object.isNew()) {
    // remove client-side author
    if (req.object.get('author')) {
      delete req.object.author
    }
    // set server-side author
    req.object.set('author', {
      '__type': 'Pointer',
      className: '_User',
      objectId: user.id
    })

    // remove client-side ACL
    if (req.object.get('ACL')) {
      delete req.object.ACL
    }

    const roleNames = [req.user.id]
    const acl = defaultACL({ roleNames })
    req.object.setACL(acl)
  }

  res.success(req.object)
})

Parse.Cloud.afterSave('Reply', req => {
  console.log(req.object.get('topic'))
  const topic = req.object.get('topic')
  topic.set('repliedAuthor', req.user)
  topic.set('repliedAt', new Date())
  topic.increment('repliedCount')
  topic.save(null, {useMasterKey})
})
