<template>
  <div class="my-header-container" :style="{ backgroundColor: bgcolor, color: color }">
    {{ title || 'Header 组件' }}
  </div>
</template>

<script>

export default {
  props: {
    title: {
      default: '',
      type: String,
    },
    bgcolor: {
      default: '',
      type: String
    },
    color: {
      default: '',
      type: String
    },
    type: {
      default: '',
      type: String,
      validate(value) {
        return ['abc', 'aaaaa'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-header-container {
  height: 60px;
  background-color: pink;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 60px;
}
</style>
