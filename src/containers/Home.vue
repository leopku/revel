<template>
  <section id="main">
    <Jumbotron></Jumbotron>
    <MainWrapper></MainWrapper>
  </section>
</template>

<script>
import Jumbotron from '@/components/Jumbotron'
import MainWrapper from '@/containers/MainWrapper'

export default {
  name: 'home',
  components: {
    Jumbotron,
    MainWrapper
  }
}
</script>
