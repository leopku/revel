<template>
  <section id="minor-wrapper" class="minor-wrapper">
    <el-row>
      <el-col class="minor">
        <div class="minor-inner">
          <el-button class="fg-white bg--dark no-border" size="large" @click="onNewTopic">新的话题</el-button>
          <el-menu theme="light" class="bg--white" :mode="menuMode">
            <el-menu-item index="1"><i class="typcn typcn-messages" style="font-size: .8em;"></i> 所有话题</el-menu-item>
            <el-menu-item index="2"><i class="typcn typcn-th-large-outline" style="font-size: .8em;"></i> 分类</el-menu-item>
            <el-menu-item v-for="(tag, index) in tags" :index="index+'2'" :key="index+2">
              <i class="tag-icon" :style="'background-color: ' + tag.color +';'"></i> {{ tag.title }}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'minor-wrapper',
  data () {
    return {
      mq: window.matchMedia('(max-width: 61.999em)'),
      menuMode: 'vertical'
    }
  },
  created () {
    this.$store.dispatch('load_category')
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onNewTopic () {
      this.$message({
        message: this.$store.state.unopenning,
        type: 'warning'
      })
    },
    onResize () {
      this.menuMode = this.mq.matches ? 'horizontal' : 'vertical'
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  }
}
</script>

<style scoped lang="scss">
.minor {
  padding: 1.25em 0;

  .minor-inner {
    display: flex;

    .el-menu {

      .el-menu-item {
        height: 2.667em;
        line-height: 2.667em;
      }

    }

  }
}

@media screen and (max-width: 61.999em) {
  .minor-wrapper {
    border-bottom: solid 1px #E5E9F2;
  }

  .minor-inner {
    align-items: center;

    .el-menu-item {
      padding: 0 0.5em;

      &:first-child {
        padding-left: 1em;
      }
    }
  }
}

@media screen and (min-width: 62em) {
  .minor-inner {
    flex-direction: column;

    &>.el-button {
      width: 100%;
    }

    .el-menu-item {
      padding-top: 1em;
      padding-left: 0;
    }
  }
}

</style>
