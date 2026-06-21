
<script setup>
  import Notify from './Notify.vue';
  import chipImg from '../assets/chip.png'

  defineProps({
    notification: Object
  })
</script>

<template>
  <notify :is-error="false">
    {{ notification.sender }} отправляет тебе {{ notification.amount }} 
    <img class="chip" :src="chipImg" alt="chip">
  </notify>
</template>

<style scoped>
  img {
    height: 16px;
  }
</style>