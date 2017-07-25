<template>
  <section>
    <el-row>
      <el-col>&nbsp;</el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <NewTopic></NewTopic>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import NewTopic from '@/components/NewTopic'
export default {
  name: 'new-topic-wrapper',
  components: {
    NewTopic
  }
}
</script>
