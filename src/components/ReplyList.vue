<template>
  <section id="reply-list" class="reply-list">
    <ReplyListItem :reply="reply" v-for="reply in replies" :key="reply.objectId"></ReplyListItem>
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
