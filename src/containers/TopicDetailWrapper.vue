<template>
  <section id="topic_detail">
    <TopicDetailJumbotron :topic="topic"></TopicDetailJumbotron>
    <Reply :replies="topic.replies"></Reply>
    <!-- <MajorWrapper></MajorWrapper> -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicDetailJumbotron from '@/components/TopicDetailJumbotron'
import Reply from '@/components/Reply'
import MajorWrapper from '@/containers/MajorWrapper'

export default {
  name: 'topic-detail',
  components: {
    TopicDetailJumbotron,
    Reply,
    MajorWrapper
  },
  created () {
    this.$store.dispatch('load_topic', { id: this.$route.params.id })
  },
  computed: {
    ...mapGetters([
      'topic'
    ])
  }
}
</script>
