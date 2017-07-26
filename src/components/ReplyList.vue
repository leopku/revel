<template>
  <section id="reply-list" class="reply-list">
    <ReplyListItem :reply="reply" v-for="reply in replies" :key="reply.objectId"></ReplyListItem>
    <div class="full-width flex flex-justify--center" style="margin: 1em 0;">
      <el-tag type="gray" :close-transition="true">显示折叠的回答</el-tag>
    </div>
    <div class="full-width flex flex-justify--center" v-if="isLogin">
      <el-form :model="reply" :rules="rules" ref="newTopicForm">
        <el-form-item prop="markdown">
          <mavon-editor id="editor" v-model="reply.markdown" :toolbars="toolbars" @change="onEditorChange" :ishljs="true" :subfield="false" placeholder="这里编写指令，预览点击右上角「眼睛」图标或按「F9」"></mavon-editor>

        </el-form-item>
      </el-form>
    </div>
    <div class="full-width flex flex-justify--end" v-if="isLogin">
      <el-popover ref="replyPopover" placement="top" v-model="isReplyPopoverVisible">
        <p>确认向接待员下达指令吗？</p>
        <div style="text-align:right;margin:0;">
          <el-button size="mini" type="text" @click="isReplyPopoverVisible=false">再改改</el-button>
          <el-button size="mini" type="primary" @click="onReplySubmit('newTopicForm')">确认</el-button>
        </div>
      </el-popover>
      <el-button type="primary" v-popover:replyPopover :disabled="isReplyDisable('newTopicForm')" :loading="replyLoading" style="margin-top: 1em; margin-right: 2em;">回复</el-button>
    </div>
    <div class="full-width flex flex-justify--center flex-align--middle" v-if="!isLogin" style="background: rgba(228,232,241,.5);min-height: 300px;">
      <a @click="$store.commit('SWITCH_LOGIN_DIALOG', true)">登入</a>&nbsp;|&nbsp;<a @click="$store.commit('SWITCH_SIGNUP_DIALOG', true)">注册</a>&nbsp;回复
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar/dist/Avatar'
import deepcopy from 'deepcopy'
import ReplyListItem from '@/components/ReplyListItem'

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
      reply: {
        markdown: '',
        content: ''
      },
      rules: {
        markdown: [
          { require: true, message: '请填写指令', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onReplySubmit (formName) {
      this.isReplyPopoverVisible = false
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message({
            message: '指令貌似是空的',
            type: 'warning'
          })
          return false
        }
        const reply = deepcopy(this.reply)
        reply['topicId'] = this.topicId
        this.$store.dispatch('save_reply', reply)
          .then(response => {
            reply.author = this.currentUser
            this.replies.push(reply)
          })
      })
    },
    isReplyDisable (formName) {
      return this.reply.markdown.trim().length === 0
      // this.$refs[formName].validate(valid => valid)
    },
    onEditorChange (markdown, html) {
      // this.markdown = markdown
      this.reply.content = this.html
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'isLogin',
      'replyLoading',
      'toolbars'
    ])
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
