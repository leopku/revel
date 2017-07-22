<template>
  <section id="topic_detail">
    <el-row>
      <el-col>
        <TopicDetailJumbotron :topic="topic"></TopicDetailJumbotron>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="22" :sm="22" :md="18" :lg="18" :span="18" :offset="1">
        <ReplyList :replies="replies" :topic-id="topic.objectId"></ReplyList>
        <el-col :span="22" v-if="replies && replies.length===0">
          <el-alert title="暂无评论" type="info" show-icon style="margin: 1em 0;"
            description="暂时还没有人对此话题进行评论，立即邀请其他用户获得回答。"
          ></el-alert>

        </el-col>
      </el-col>
      <el-col :xs="0" :sm="0" :md="4" :lg="4" :span="4" :offset="1" style="margin: 1em 0;">
        <Affix>
          <el-card class="topic-detail-right no-border">
            <p>关注者 <el-tag type="gray">88</el-tag></p>
            <p>被赞 <el-tag type="gray">27</el-tag> 次</p>
            <p>被收藏 <el-tag type="gray">88</el-tag></p>
            <div class="bottom" style="margin: 1em 0;">
              <el-button class="full--width" type="primary" size="small">关注</el-button>
              <el-button class="full--width" type="primary" size="small" @click="goAnchor('#editor')">回复</el-button>
            </div>
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
    const topicId = this.$route.params.id
    this.$store.dispatch('load_topic', { id: topicId })
    console.log(this.$route.params.id, this.topic.objectId)
    this.$store.dispatch('load_replies', { topicId })
  },
  methods: {
    goAnchor (selector) {
      if (!this.isLogin) {
        this.$store.commit('SWITCH_LOGIN_DIALOG', true)
      } else {
        // window.location.href = '#editor'
        const anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'replies',
      'topic'
    ])
  }
}
</script>

<style scoped lang="scss">
.topic-detail-right {
  .el-tag {
    height: 20px;
    padding: 0 4px;
  }
  .el-button+.el-button {
    margin: .5em 0;
  }
}
</style>
