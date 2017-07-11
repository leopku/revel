<template>
  <section id="major-wrapper" class="major-wrapper">
    <TopicList></TopicList>
  </section>
</template>

<script>
import TopicList from '@/components/TopicList'

export default {
  name: 'major-wrapper',
  components: {
    TopicList
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
  // height: 3.167em;
  // width: 3.167em;
  height: 2.9em;
  width: 2.9em;
  border-radius: 4px;

  i {
    font-size: 1em;
  }
}
</style>
