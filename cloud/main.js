/*
* @Author: leopku
* @Date:   2017-06-27 19:20:30
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-28 00:09:14
*/

'use strict'

Parse.Cloud.define('hello', (req, res) => res.success('Hi'))

Parse.Cloud.define('signup', (req, res) => {
  let user = new Parse.User()
  console.log(req.params)
  user.set('username', req.params.username)
  user.set('email', req.params.email)
  user.set('password', req.params.password)
  user.signUp(null, {useMasterKey: true})
    .then(response => response)
    .catch(error => console.log(error.message))
  return res.success('Sign up successfully')
})
