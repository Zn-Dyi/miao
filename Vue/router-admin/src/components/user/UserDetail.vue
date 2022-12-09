<template>
  <div class="detail-container">
    <button @click="goBack">返回</button>
    UserDetail --- <!-- {{ this.$route.params.id }} --> {{ id }}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      default: 0,
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
