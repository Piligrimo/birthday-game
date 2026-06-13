
<script setup>
  import { computed } from 'vue'
  import { useStore } from '../store';
  import { useRouter } from 'vue-router';

  const store = useStore()
  const router = useRouter()

  const logOff = () => {
    localStorage.removeItem('token')
    store.user = null 
    router.push('/login')
  }
</script>

<template>
    <h2>{{ store.user.name }}</h2>
    <button @click="logOff">Выйти</button>
</template>



