<template>
  <div class="one-container">
    <h1>One Component</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    add() {
      this.count += 1
      this.$emit('add_change', this.count)
    }
  }

}
</script>

<style>
.one-container {
  background-color: rgb(233, 128, 30);
  height: 300px;
}
</style>
