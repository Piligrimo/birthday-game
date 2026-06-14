
<script setup>
  import { computed, ref,onMounted } from 'vue'
  import { useStore } from '../store';
  import { useRouter } from 'vue-router';
  import chipImg from '../assets/chip.png'
import { api } from '../api';

  const store = useStore()
  const router = useRouter()
  const selectedUserId = ref()
  const sum = ref(1)
  const users = ref([])

  const logOff = () => {
    localStorage.removeItem('token')
    store.user = null 
    router.push('/login')
  }

  const sendMoney = async () => {
    await api.sendChips(selectedUserId.value, sum.value)
    await store.getUser()
    users.value = await api.getUsers()
  }

  onMounted(async () => {
    users.value = await api.getUsers()
  })
  
</script>

<template>
    <h2>{{ store.user.name }}</h2>
    <div class="info">
      <p>{{ store.user.chips }}</p>
      <img class="chip" :src="chipImg" alt="chip">
    </div>
    <input v-model="sum" type="number" step="1"  min="1" :max="store.user.chips">
    <button @click="sendMoney">Отправить фишки</button>
    <table>
      <tr v-for="user in users" :class="{chosen: user.id === selectedUserId}" :key="user.id">
        <td align="left" @click="selectedUserId = user.id">{{user.name}}</td>
        <td align="right">{{user.chips}} <img class="chip" :src="chipImg" alt="chip"></td>
      </tr>
    </table>
    <button @click="logOff">Выйти</button>
    <RouterLink to="/admin">
      <button v-if="store.user.isAdmin">Админка</button>
    </RouterLink>
</template>

<style>
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