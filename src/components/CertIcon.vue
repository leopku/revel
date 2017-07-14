<template>
  <span class="cert-icon">
    <i class="typcn cert-icon--wrapper" :class="`typcn-${wrapperIcon}`" :style="`color: ${wrapperColor};font-size: ${wrapperSize};`"></i>
    <i class="typcn cert-icon--inner" :class="`typcn-${innerIcon}`" :style="`color: ${innerColor};font-size: ${innerSize};`"></i>
  </span>
</template>

<script>
export default {
  name: 'cert-icon',
  props: {
    wrapperIcon: {
      type: String,
      default: 'starburst'
    },
    wrapperColor: {
      type: String,
      default: 'orange'
    },
    wrapperSize: {
      type: String,
      default: '.8em'
    },
    innerIcon: {
      type: String,
      default: 'star'
    },
    innerColor: {
      type: String,
      default: 'white'
    },
    innerSize: {
      type: String,
      default: '.6em'
    }
  }
}
</script>

<style scoped lang="scss">
.cert-icon {

  .cert-icon--inner {
    display: float;
    position: relative;
    left: -2.45em;
    top: -0.2em;
  }
}
</style>
