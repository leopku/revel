<template>
  <section id="minor-wrapper" class="minor-wrapper">
    <el-row>
      <el-col class="minor">
        <div class="minor-inner" :class="flexDirection">
          <el-button class="fg-white bg--dark no-border" size="large">新的话题</el-button>
          <el-menu theme="light" class="bg--white" :mode="menuMode">
            <el-menu-item index="1"><i class="typcn typcn-messages" style="font-size: .8em;"></i> 所有话题</el-menu-item>
            <el-menu-item index="2"><i class="typcn typcn-th-large-outline"></i> 分类</el-menu-item>
            <el-menu-item v-for="(category, index) in categories" :index="index+'2'" :key="index+2">
              <i class="tag-icon" :class="category.cls"></i> {{ category.title }}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'minor-wrapper',
  data () {
    let mq = window.matchMedia('(max-width: 61.999em)')
    return {
      menuMode: mq.matches ? 'horizontal' : '',
      flexDirection: mq.matches ? 'flex-direction--row' : 'flex-direction--column',
      categories: [{
        title: '求助', cls: 'bg--orange'
      },
      {
        title: '开发', cls: 'bg--deepskyblue'
      },
      {
        title: '公告', cls: 'bg--turquoise'
      }]
    }
  },
  mounted () {
    // let mq = window.matchMedia('(max-width: 62em)')
    // console.log(mq)
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize (evt) {
      let mq = window.matchMedia('(max-width: 61.999em)')
      console.log(mq)
      this.menuMode = mq.matches ? 'horizontal' : ''
      this.flexDirection = mq.matches ? 'flex-direction--row' : 'flex-direction--column'
    }
  }
}
</script>

<style scoped lang="scss">
.minor {
  // margin-top: 3em;
  padding: 1.25em 0;
  // flex-direction: column
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
  // .minor {
  //   padding: 2.5em 0;
  // }

  .minor-inner {
    &>.el-button {
      width: 100%;
    }

    .el-menu-item {
      padding-top: 2em;
      padding-left: 0;
    }
  }
}

</style>
