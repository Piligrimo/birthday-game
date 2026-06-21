
<script setup>
  import { socket } from '../api/socket'
  import heart from '../assets/heart.png'
  import { useStore } from '../store'

  const store = useStore()
    
  const like = () => {
    socket.send(JSON.stringify({
        type: 'like',
        name: store.user.name,
    }))
  }
</script>

<template>
  <button class="pixel-border" @click="like">
    <img 
      class="heart" 
      :src="heart" 
    >
  </button>    
</template>

<style scoped>
.heart {
  height: 60px;
}
</style>