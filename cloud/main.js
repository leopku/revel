/*
* @Author: leopku
* @Date:   2017-06-27 19:20:30
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-20 15:30:13
*/
'use strict'

/* global Parse */
Parse.Cloud.define('hello', (req, res) => res.success('Hi'))

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
  const user = req.user
  console.log(user)
  console.log(req.params.replyId)
  console.log(req.params.userId)
  return res.success('vote successfully')
})

Parse.Cloud.beforeSave('Reply', (req, res) => {
  const user = req.user

  if (req.object.get('author')) {
    delete req.object.author
  }
  req.object.set('author', {
    '__type': 'Pointer',
    className: '_User',
    objectId: user.id
  })
  res.success(req.object)
})
