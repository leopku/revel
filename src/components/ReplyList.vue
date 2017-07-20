<template>
  <section id="reply-list" class="reply-list">
    <ReplyListItem :reply="reply" v-for="reply in replies" :key="reply.objectId"></ReplyListItem>
    <div class="full-width flex flex-justify--center" style="margin: 1em 0;">
      <el-tag type="gray" :close-transition="true">显示折叠的回答</el-tag>
    </div>
    <div class="full-width flex flex-justify--center" v-if="isLogin">
      <mavon-editor v-model="markdown" :toolbars="toolbars" @change="onEditorChange" :ishljs="true"></mavon-editor>
    </div>
    <div class="full-width flex flex-justify--end" v-if="isLogin">
      <el-popover ref="replyPopover" placement="top" v-model="isReplyPopoverVisible">
        <p>确认向接待员下达指令吗？</p>
        <div style="text-align:right;margin:0;">
          <el-button size="mini" type="text" @click="isReplyPopoverVisible=false">再改改</el-button>
          <el-button size="mini" type="primary" @click="onReplyClick">确认</el-button>
        </div>
      </el-popover>
      <el-button type="primary" v-popover:replyPopover :disabled="canReply" :loading="replyLoading" style="margin-top: 1em; margin-right: 2em;">回复</el-button>
    </div>
    <div class="full-width flex flex-justify--center flex-align--middle" v-if="!isLogin" style="background: rgba(228,232,241,.5);min-height: 300px;">
      <a @click="$store.commit('SWITCH_LOGIN_DIALOG', true)">登入</a>&nbsp;|&nbsp;<a @click="$store.commit('SWITCH_SIGNUP_DIALOG', true)">注册</a>&nbsp;回复
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar/dist/Avatar'
import ReplyListItem from '@/components/ReplyListItem'
import { defaultACL } from '@/util'

export default {
  name: 'reply',
  props: {
    replies: {
      type: Array,
      require: true,
      default: () => []
    },
    topicId: {
      type: String
    }
  },
  data () {
    return {
      isReplyPopoverVisible: false,
      markdown: '',
      html: ''
    }
  },
  methods: {
    onReplyClick () {
      this.isReplyPopoverVisible = false
      if (this.markdown.trim().length === 0) {
        this.$message({
          message: '指令貌似是空的',
          type: 'warning'
        })
        return
      }
      const markdown = this.markdown
      const content = this.html
      const topicId = this.topicId
      const authorId = this.currentUser.objectId
      const ACL = defaultACL

      ACL[authorId] = { write: true }
      this.$store.dispatch('save_reply', { markdown, content, topicId, authorId, ACL })
      const topics = this.$store.state.topics
      topics.one.replies.push({
        markdown,
        content,
        author: this.currentUser,
        topic: {
          '__type': 'Pointer',
          className: 'Topic',
          objectId: topicId
        }
      })
      this.markdown = ''
    },
    onEditorChange (markdown, html) {
      this.markdown = markdown
      this.html = html
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'isLogin',
      'replyLoading',
      'toolbars'
    ]),
    canReply () {
      this.markdown.trim().length !== 0
    }
  },
  components: {
    Avatar,
    ReplyListItem
  }
}
</script>

<style scoped lang="scss">
.el-carousel__item {
  h3 {
    color: #475669;
    font-size: 18px;
    opacity: .75;
    line-height: 300px;
    margin: 0
  }

  &:nth-child(2n) {
    background-color: #99a9bf;
  }

  &:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
</style>
