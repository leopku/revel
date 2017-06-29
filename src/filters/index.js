/*
* @Author: leopku
* @Date:   2017-06-26 14:06:33
* @Last Modified by:   leopku
* @Last Modified time: 2017-06-28 10:31:18
*/

'use strict'

function firstAndCapitalize (value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase()
}

export default { firstAndCapitalize }
