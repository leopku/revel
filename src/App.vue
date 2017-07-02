<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

export default {
  name: 'app',
  components: {
    Navbar,
    Foot
  }
}
</script>
