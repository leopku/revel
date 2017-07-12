<template>
  <section id="reply-list">
    <h1>Reply List</h1>
    <div v-for="reply in replies">
      <p>{{ reply.content }}</p>
    </div >
  </section>
</template>

<script>
export default {
  name: 'reply',
  props: {
    replies: {
      type: Array,
      require: true,
      default: () => []
    }
  }
}
</script>
