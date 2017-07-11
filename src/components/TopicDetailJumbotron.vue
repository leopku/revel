<template>
  <section id="topic-detail">
    <Jumbotron :xs="22" :sm="22" class="flex-justify--start">
      <section slot="jumbotron-content">
        <el-tag type="gray" v-for="tag in topic.tags" key="tag.objectId" :color="tag.color" :class="{ 'fg-white': tag.hasOwnProperty('color') }">{{tag.title}}</el-tag>
        <p class="text-emphasis--small font-weight--500">{{topic.title}}</p>
        <p class="text-regular--small">{{topic.content}} </p>
      </section>
    </Jumbotron>
  </section>
</template>

<script>
import Jumbotron from '@/components/Jumbotron'

export default {
  name: 'topic-detail-jumbotron',
  components: {
    Jumbotron
  },
  props: {
    topic: {
      type: Object,
      require: true,
      default: { tags: [] }
    }
  }
}
</script>
