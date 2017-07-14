<template>
  <section id="jumbotron" class="bg-gray--light">
    <el-row>
      <!-- <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" :span="22" :offset="1" class="jumbotron-inner" :class="colClass" :style="`min-height: ${minHeight};`"> -->
      <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" :span="22" :offset="1" class="jumbotron-inner" :class="colClass">
        <slot name="jumbotron-content"></slot>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'jumbotron',
  props: {
    xs: {
      type: [Number, Object],
      default: 0
    },
    sm: {
      type: [Number, Object],
      default: 0
    },
    md: {
      type: [Number, Object],
      default: 22
    },
    lg: {
      type: [Number, Object],
      default: 22
    },
    colClass: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: '20vh'
    }
  }
}
</script>

<style scoped lang="scss">
#jumbotron {
  // min-height: 20vh;
  // background-color: #eef1f6;
  .jumbotron-inner {
    padding: 1em 0;
  }

  .el-col {
    // min-height: 20vh;
    flex-wrap: nowrap;
  }
}
</style>
