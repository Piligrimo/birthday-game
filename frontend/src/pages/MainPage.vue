
<script setup>
  import { computed, ref,onMounted } from 'vue'
  import { useStore } from '../store';
  import { useRouter } from 'vue-router';
  import chipImg from '../assets/chip.png'
  import { api } from '../api';
  import { handleSocketConnection } from '../api/socket';
  handleSocketConnection()
  const store = useStore()
  const router = useRouter()

  const logOff = () => {
    localStorage.removeItem('token')
    store.user = null 
    router.push('/login')
  }
  
</script>

<template>
    <div class="menu">
      <RouterLink class="menu-item" to="/my/sending">Переводы</RouterLink> 
      <RouterLink class="menu-item" to="/my/lottery">Лотерея</RouterLink> 
    </div>
    <h2>{{ store.user.name }}</h2>
    <div class="info">
      <p>{{ store.user.chips }}</p>
      <img class="chip" :src="chipImg" alt="chip">
    </div>
    <RouterView :user="store.user" />
    <button class="pixel-border" @click="logOff">Выйти</button>
    <RouterLink to="/admin">
      <button class="pixel-border" v-if="store.user.isAdmin">Админка</button>
    </RouterLink>
</template>

<style scoped>
.chip {
  height: 16px;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
</style>