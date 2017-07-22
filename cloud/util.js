/*
* @Author: leopku
* @Date:   2017-07-20 22:01:12
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-22 23:53:24
*/

'use strict'

/* global Parse */

const useMasterKey = true

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
  defaultACL
}
