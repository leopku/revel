<template>
  <div class="avatar">
    <span class="avatar-inner bg--mediumturquoise text-regular--big" v-if="!avatar">
      <slot name="letter" >
        {{ username | firstAndCapitalize }}
      </slot>
    </span>
    <img :src="avatar" v-if="avatar" class="avatar-inner bg--mediumturquoise text-regular--big">
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: ['username', 'avatar']
}
</script>

<style scoped lang="scss">
.avatar {
  margin: 0 .8em;

  .avatar-inner {
    color: #fff;
    display: inline-block;
    box-sizing: content-box;
    text-align: center;
    vertical-align: center;
    font-weight: normal;
    line-height: 2em;

    height: 2em;
    width: 2em;
    border-radius: 2em;
  }
}
</style>
