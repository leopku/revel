<template>
  <section id="major-wrapper" class="major-wrapper">
        <el-row>
          <el-col :span="23" class="major">
            <div class="major-inner flex flex-justify--between">
              <el-cascader
                :options="options"
                size="small"
                v-model="selectedOptions"
                @change="onChange" id="sortSelect">
              </el-cascader>
              <div class="button-flat bg-gray--light flex flex-justify--center flex-align--middle"><i class="typcn typcn-arrow-sync"></i></div>
            </div>
          </el-col>
          <el-col :span="23" class="topics">
            <TopicListItem v-for="(topic, index) in topics" :topic="topic" :key="index"></TopicListItem>
          </el-col>
        </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicListItem from '@/components/TopicListItem'

export default {
  name: 'major-wrapper',
  components: {
    TopicListItem
  },
  data () {
    return {
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
    onChange (value) {
      console.log(value)
    }
  },
  computed: {
    ...mapGetters([
      'topics'
    ])
  }
}
</script>

<style lang="scss">
.major {
  padding: 1.25em 0;
  // margin-top: 1.25em;

  .el-cascader {
    .el-input {
      .el-input__inner {
        height: 2.9em;
        min-height: 2.9em;
        background-color: #E5E9F2;

        border-width: 0;
      }
    }

    .el-cascader__label {
      color: #48576a;
      margin-top: 5px;
    }
  }

}

.button-flat {
  height: 3.167em;
  width: 3.167em;
  border-radius: 4px;

  i {
    font-size: 1.3em;
  }
}
</style>
