
<script setup>
  defineProps({isError: Boolean})
</script>

<template>
  <div class="pixel-border notify">
    <slot/>
  </div>
</template>

<style scoped>
  .notify {
    background-color: #565a5e;
    --pixel-color: #485361;
    padding: 10px;
  }
</style>