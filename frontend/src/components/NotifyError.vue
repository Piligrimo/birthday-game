
<script setup>
import Notify from './Notify.vue';

  defineProps({
    notification: Object
  })
</script>

<template>
  <notify :is-error="true">
    {{ notification.message }}
  </notify>
</template>

<style scoped>
  
</style>