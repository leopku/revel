/*
* @Author: leopku
* @Date:   2017-06-27 19:20:30
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-22 12:30:40
*/
'use strict'

const { createVote, useMasterKey, defaultACL } = require('./util')

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
          console.log(results)
          res.success('Hi')
        })
        .catch(error => res.error(error))
    })
    .catch(error => res.error(error))
  // query.find()
  //   .then(results => {
  //     console.log(results)
  //     res.success('Hi')
  //   })
  //   .catch(() => res.error('failed'))
  // res.success('Hi')
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

Parse.Cloud.define('upVote', (req, res) => {
  if (!req.params.replyId || !req.user) {
    res.success('Vote successfully!')
    return
  }
  const replyQuery = new Parse.Query('Reply')
  replyQuery.get(req.params.replyId)
    .then(reply => {
      const relation = reply.relation('upVoted')
      const relationQuery = relation.query()
      relationQuery.equalTo('objectId', req.user.id)
      relationQuery.find({useMasterKey})
        .then(results => {
          if (results.length === 0) {
            relation.add(req.user)
            reply.increment('upVotedCount')
            reply.save(null, {useMasterKey})
              .then(result => res.success('vote successfully'))
              .catch(error => res.error(error))
          } else {
            relation.remove(req.user)
            reply.decrement('upVotedCount')
            reply.save(null, {useMasterKey})
              .then(result => res.success('vote successfully'))
              .catch(error => res.error(error))
          }
        })
    })
    .then(result => res.success('vote successfully'))
    .catch(error => res.error(error))
})

Parse.Cloud.define('downVote', (req, res) => {
  if (!req.params.replyId || !req.user) {
    res.success('Vote successfully!')
    return
  }
  const replyQuery = new Parse.Query('Reply')
  replyQuery.get(req.params.replyId)
    .then(reply => {
      const relation = reply.relation('downVotedBy')
      const relationQuery = relation.query()
      relationQuery.equalTo('objectId', req.user.id)
      relationQuery.find({useMasterKey})
        .then(results => {
          if (results.length === 0) {
            relation.add(req.user)
            reply.increment('downVotedCount')
            reply.save(null, {useMasterKey})
              .then(result => res.success('vote successfully'))
          } else {
            relation.remove(req.user)
            reply.decrement('downVotedCount')
            reply.save(null, {useMasterKey})
              .then(result => res.success('vote successfully'))
          }
        })
    })
    .then(result => res.success('vote successfully'))
    .catch(error => res.error(error))
})

Parse.Cloud.define('upVoteWillDelete', (req, res) => {
  const voteQuery = new Parse.Query('Vote')
  const replyId = req.params.replyId
  if (!replyId || !req.user) {
    res.success('Vote successfully!')
    return
  }
  const reply = new Parse.Object('Reply', { objectId: replyId })
  voteQuery.equalTo('reply', reply)
  voteQuery.find()
    .then(results => {
      if (results.length === 0) {
        // never voted before, create first
        const vote = createVote({
          reply,
          user: req.user,
          action: 'upVotedBy',
          upVotedCount: 1
        })

        vote.save(null, {useMasterKey})
          .then(result => res.success('vote successfully'))
          .catch(error => res.error(error))
      } else {
        // already voted
        const vote = results[0]
        const relation = vote.relation('upVotedBy')
        const relationQuery = relation.query()
        relationQuery.equalTo('objectId', req.user.id)
        relationQuery.find({useMasterKey})
          .then(results => {
            if (results.length === 0) {
              relation.add(req.user)
              // vote.increment('upVotedCount')
              // console.log(reply.upVotedCount)
              const replyQuery = new Parse.Query('Reply')
              replyQuery.get(req.params.replyId)
                .then(reply => {
                  reply.increment('upVotedCount')
                  reply.save(null, {useMasterKey})
                })
              console.log('*** add ***')
            } else {
              relation.remove(req.user)
              const replyQuery = new Parse.Query('Reply')
              replyQuery.get(req.params.replyId)
                .then(reply => {
                  reply.decrement('upVotedCount')
                  reply.save(null, {useMasterKey})
                })
              console.log('*** remove ***')
            }

            vote.save(null, {useMasterKey})
              .then(result => res.success('voted successfully'))
              .catch(error => res.error(error))
          })
          .catch(error => res.error(error))
      }
    })
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
