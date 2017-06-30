<template>
  <section id="main-wrapper" class="main-wrapper">
    <el-row>
      <el-col :xs="{span: 0}" :sm="{span: 22}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 1}" :span="4" :offset="1" class="transition-width">
        <MinorWrapper></MinorWrapper>
      </el-col>
      <el-col :xs="{span: 23}" :sm="{span: 23}" :md="{span: 18, offset: 1}" :lg="{span: 18, offset: 1}" :span="18" :offset="1">
        <MajorWrapper></MajorWrapper>
        <div
          class="full-width flex flex-justify--center"
          style="padding-top: 1em;"
          v-loading="topicLoading"
          :element-loading-text="loadingMsg"
           @click="onLoadMoreClick">
          <el-tag type="gray">载入更多</el-tag>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MinorWrapper from '@/containers/MinorWrapper'
import MajorWrapper from '@/containers/MajorWrapper'

export default {
  name: 'main-wrapper',
  components: {
    MinorWrapper,
    MajorWrapper
  },
  data () {
    return {
      // isLoading: false,
      loadingMsgs: [
        '欢迎乘坐西部世界专列',
        '正在赶往 黄昏天台',
        '正在赶往 主控制室',
        '正在赶往 抵达大厅',
        '正在赶往 玻璃研究室',
        '正在赶往 甜水镇',
        '正在赶往 贱民镇',
        // '正在赶往 幽灵之国',
        '正在赶往 无人之地',
        '正在赶往 守夜者之守望'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'topicLoading'
    ]),
    loadingMsg () {
      const idx = Math.floor(Math.random() * this.loadingMsgs.length)
      return this.loadingMsgs[idx]
    }
  },
  methods: {
    onLoadMoreClick (evt) {
      this.$store.dispatch('load_more_topics')
      // this.isLoading = true
      // setTimeout(() => {
      //   this.isLoading = false
      // }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
.main-wrapper {
  min-height: 50vh;
}

@media screen and (max-width: 62em) {
  .main-wrapper>.el-row {
    display: flex;
    flex-direction: column;
  }
}
</style>
