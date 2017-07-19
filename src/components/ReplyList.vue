<template>
  <section id="reply-list" class="reply-list">
    <ReplyListItem :reply="reply" v-for="reply in replies" :key="reply.objectId"></ReplyListItem>
    <div class="full-width flex flex-justify--center" style="margin: 1em 0;">
      <el-tag type="gray" :close-transition="true">显示折叠的回答</el-tag>
    </div>
    <div class="full-width flex flex-justify--center" v-if="isLogin">
      <mavon-editor :toolbars="toolbars"></mavon-editor>
    </div>
    <div class="full-width flex flex-justify--end" v-if="isLogin">
      <el-button type="primary" style="margin-top: 1em; margin-right: 2em;">回复</el-button>
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

export default {
  name: 'reply',
  props: {
    replies: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
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
