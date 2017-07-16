<template>
  <section id="reply-list" class="reply-list">
    <ReplyListItem :reply="reply" v-for="reply in replies" :key="reply.objectId"></ReplyListItem>
    <div class="full-width flex flex-justify--center">
      <el-tag type="gray">显示隐藏的回答</el-tag>
    </div>
  </section>
</template>

<script>
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
  components: {
    Avatar,
    ReplyListItem
  }
}
</script>
