/*
* @Author: leopku
* @Date:   2017-07-20 22:01:12
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-22 12:19:46
*/

'use strict'

/* global Parse */

const useMasterKey = true

/**
 * [createVote description]
 * @param  {Object} options.reply          [description]
 * @param  {Object} options.user           [description]
 * @param  {String} options.action         'upVotedBy' or 'downVotedBy'
 * @param  {Number} options.upVotedCount   [description]
 * @param  {Number} options.downVotedCount [description]
 * @param  {Array}  options.roleNames      [description]
 * @return {[type]}                        [description]
 */
function createVote ({
  reply,
  user,
  action,
  upVotedCount = 0,
  downVotedCount = 0,
  roleNames = []
} = {}) {
  const Vote = Parse.Object.extend('Vote')
  const vote = new Vote()

  // deal with relations
  const relation = vote.relation(action)
  relation.add(user)

  // deal with reply
  vote.set('reply', reply)

  const acl = new Parse.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess('level0', true)
  acl.setWriteAccess('Moderators', true)
  for (var i = roleNames.length - 1; i >= 0; i--) {
    acl.setWriteAccess(roleNames[i], true)
  }
  vote.setACL(acl)

  // deal with vote count
  vote.set('upVotedCount', upVotedCount)
  vote.set('downVotedCount', downVotedCount)

  return vote
}

function defaultACL ({
  roleNames = []
} = {}) {
  const acl = new Parse.ACL()
  acl.setPublicReadAccess(true)
  acl.setWriteAccess('level0', true)
  acl.setWriteAccess('Moderators', true)
  for (var i = roleNames.length - 1; i >= 0; i--) {
    acl.setWriteAccess(roleNames[i], true)
  }
  return acl
}

module.exports = {
  useMasterKey,
  defaultACL,
  createVote
}
