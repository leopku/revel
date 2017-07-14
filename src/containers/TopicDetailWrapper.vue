<template>
  <section id="topic_detail">
    <el-row>
      <el-col>
        <TopicDetailJumbotron :topic="topic"></TopicDetailJumbotron>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="1">
        <ReplyList :replies="topic.replies"></ReplyList>
        <el-col :span="22" v-if="topic.replies && topic.replies.length===0">
          <el-alert title="暂无评论" type="info" show-icon style="margin: 1em 0;"
            description="暂时还没有人对此话题进行评论，立即邀请其他用户获得回答。"
          ></el-alert>

        </el-col>
      </el-col>
      <el-col :span="4" :offset="1" style="margin: 1em 0;">
        <Affix>
          <el-card>
            被赞 27 次
          </el-card>
        </Affix>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Affix from '@/components/Affix'
import TopicDetailJumbotron from '@/components/TopicDetailJumbotron'
import ReplyList from '@/components/ReplyList'

export default {
  name: 'topic-detail',
  components: {
    Affix,
    TopicDetailJumbotron,
    ReplyList
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
