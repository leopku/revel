<template>
  <section id="topic-list">
        <el-row>
          <el-col :span="23" :offset="0" class="major">
            <div class="major-inner flex flex-justify--between">
              <el-cascader
                :options="options"
                size="small"
                v-model="selectedOptions"
                @change="onChange" id="sortSelect">
              </el-cascader>
              <div class="button-flat bg-gray--light flex flex-justify--center flex-align--middle" @click="onRefreshClick">
                <i class="typcn typcn-arrow-sync"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="23" :offset="0" class="topics" v-loading="topicsRefreshing" :element-loading-text="refreshingMessage">
            <TopicListItem v-for="(topic, index) in topics" :topic="topic" :key="index"></TopicListItem>
          </el-col>
        </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicListItem from '@/components/TopicListItem'

export default {
  name: 'topic-list',
  components: {
    TopicListItem
  },
  data () {
    return {
      topicsRefreshing: false,
      refreshingMessage: this.$store.state.common.unopenning,
      field: 'createdAt',
      descend: false,
      options: [{
        value: 'latest',
        label: '最新回复'
      },
      {
        value: 'top',
        label: '热门话题'
      },
      {
        value: 'newest',
        label: '近期话题'
      },
      {
        value: 'oldest',
        label: '历史话题'
      }],
      selectedOptions: ['latest']
    }
  },
  created () {
    this.$store.dispatch('load_topics')
  },
  methods: {
    onRefreshClick (evt) {
      this.topicsRefreshing = true
      setTimeout(() => {
        this.topicsRefreshing = false
      }, 2000)
    },
    onChange (value) {
      let field = ''
      let descend = false
      switch (value[0]) {
        case 'latest':
          field = 'repliedAt'
          descend = true
          break
        case 'top':
          field = 'replyCount'
          break
        case 'newest':
          field = 'createdAt'
          descend = true
          break
        case 'oldest':
          field = 'createdAt'
          descend = false
          break
        default:
          field = ''
          descend = false
      }

      // TODO: real sorting by selected type
      // TODO: resort by watching this.field & this.descend reactively
      if (field !== this.field || descend !== this.descend) {
        if (field === 'createdAt') {
          this.field = field
          this.descend = descend
          this.$store.dispatch('sort_topics', { field, descend })
        } else {
          this.$message({
            message: this.$store.state.common.unopenning,
            type: 'warning'
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'topics'
    ])
  }
}
</script>
