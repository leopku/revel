<template>
  <section id="jumbotron" class="bg-gray--light">
    <el-row>
      <el-col :xs="{span: 0}" :sm="{span: 0}" :md="{span: 22}" :lg="{span: 22}" :span="22" :offset="1" class="flex flex-justify--center flex-align--middle">
        <p class="text-emphasis">欢迎访问 Revel 官方论坛</p>
        <p class="text-regular">不要发布无意义的内容，在你提问前，请务必要阅读《提问的智慧》</p>
        <p class="text-regular">请避免发表凑字数的内容，请发表完整、有条理的帖子。</p>
        <p class="text-regular">如果你想感谢别人，请用赞按钮，使用这个功能对发帖人在论坛系统中的信誉有帮助。</p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'jumbotron'
}
</script>

<style scoped lang="scss">
#jumbotron {
  // min-height: 20vh;
  // background-color: #eef1f6;

  .el-col {
    min-height: 20vh;
    flex-wrap: nowrap;
    flex-direction: column;
  }
}
</style>
