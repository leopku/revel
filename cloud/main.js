/*
* @Author: leopku
* @Date:   2017-06-27 19:20:30
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-21 00:37:35
*/
'use strict'

const { createVote } = require('./util')

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
      relationQuery.find({useMasterKey: true})
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
  user.signUp(null, {useMasterKey: true})
    .then(response => res.success(response))
    .catch(error => res.error(error))
})

Parse.Cloud.define('upVote', (req, res) => {
  const voteQuery = new Parse.Query('Vote')
  const replyId = req.params.replyId
  if (!replyId || !req.user) {
    res.success('Vote successfully')
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

        vote.save(null, {useMasterKey: true})
          .then(result => res.success('vote successfully'))
          .catch(error => res.error(error))
      } else {
        // already voted
        const vote = results[0]
        const relation = vote.relation('upVotedBy')
        const relationQuery = relation.query()
        relationQuery.equalTo('objectId', req.user.id)
        relationQuery.find({useMasterKey: true})
          .then(results => {
            if (results.length === 0) {
              relation.add(req.user)
              vote.increment('upVotedCount')
              console.log('*** add ***')
            } else {
              relation.remove(req.user)
              let upVotedCount = vote.get('upVotedCount')
              upVotedCount--
              vote.set('upVotedCount', upVotedCount)
              console.log('*** remove ***')
            }

            vote.save(null, {useMasterKey: true})
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
    if (req.object.get('author')) {
      delete req.object.author
    }
    req.object.set('author', {
      '__type': 'Pointer',
      className: '_User',
      objectId: user.id
    })
  }

  res.success(req.object)
})
