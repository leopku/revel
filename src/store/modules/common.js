/*
* @Author: leopku
* @Date:   2017-07-05 09:21:37
* @Last Modified by:   leopku
* @Last Modified time: 2017-07-18 20:44:32
*/

'use strict'

// import Vue from 'vue'
import { Message } from 'element-ui'
import { COMMON_LOAD, COMMON_LOAD_SUCCESS, COMMON_LOAD_FAILED } from '../mutation-types'
import client from '@/client'

const toolbars = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: false, // 图片链接
  code: true, // code
  table: false, // 表格
  subfield: true, // 是否需要分栏
  fullscreen: false, // 全屏编辑
  readmodel: false, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true // 右对齐
}

const state = {
  toolbars,
  unopenning: '无人之地暂不对游人开放',
  config: {
    forumTitle: null,
    forumDescription: null
  },
  loading: false,
  loaded: false
}

const getters = {
  toolbars: state => state.toolbars,
  config: state => state.config
}

const mutations = {
  [COMMON_LOAD] (state) {
    state.loading = true
    state.error = false
  },
  [COMMON_LOAD_SUCCESS] (state, { config }) {
    state.loading = false
    state.loaded = true
    state.config = config
  },
  [COMMON_LOAD_FAILED] (state, { error }) {
    state.loading = false
    state.loaded = false
    state.error = error.message
    Message({
      message: '网络异常，请稍候再试',
      type: 'error',
      duration: 0,
      showClose: true
    })
  }
}

const actions = {
  load_jumbotron ({ commit }) {
    commit(COMMON_LOAD)
    client.getConfig()
      .then(config => commit(COMMON_LOAD_SUCCESS, { config }))
      .catch(error => commit(COMMON_LOAD_FAILED, { error }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
