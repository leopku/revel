<template>
  <section id="main">
    <Jumbotron col-class="flex flex-justify--center flex-align--middle flex-direction--column">
      <section slot="jumbotron-content" class="flex flex-justify--center flex-align--middle flex-direction--column">
        <p class="font-hei text-emphasis">{{ config.forumTitle }}</p>
        <p class="font-song text-regular--small" v-html="config.forumDescription"></p>
      </section>
    </Jumbotron>
    <MainWrapper></MainWrapper>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import Jumbotron from '@/components/Jumbotron'
import MainWrapper from '@/containers/MainWrapper'

export default {
  name: 'home',
  components: {
    Jumbotron,
    MainWrapper
  },
  created () {
    this.$store.dispatch('load_jumbotron')
  },
  computed: {
    ...mapGetters([
      'config'
    ])
  }
}
</script>
