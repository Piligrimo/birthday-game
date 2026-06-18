
<script setup>
  import { computed, ref,onMounted } from 'vue'
  import { useStore } from '../store';
  import { useRouter } from 'vue-router';
  import chipImg from '../assets/chip.png'
	import { api } from '../api';

  const store = useStore()
  const router = useRouter()
  const selectedUserId = ref()
  const users = ref([])
  const sum = ref(1)

  const props = defineProps({
    user: Object
  })

  const sendMoney = async () => {
    await api.sendChips(selectedUserId.value, sum.value)
    await store.getUser()
    users.value = await api.getUsers()
  }

  onMounted(async () => {
    users.value = await api.getUsers()
    console.log(JSON.stringify(users.value.reduce((acc,{name, code})=> {
      return {
        [name]: code,
        ...acc
      }
    }, {})))
    
  })
</script>

<template>
    <input class="pixel-border" v-model="sum" type="number" step="1"  min="1" :max="store.user.chips">
    <button class="pixel-border" @click="sendMoney">Отправить фишки</button>
    <div  class="user-table">
      <table>
      <tr v-for="user in users" :class="{chosen: user.id === selectedUserId}" :key="user.id">
        <td align="left" @click="selectedUserId = user.id">{{user.name}}</td>
        <td align="right">{{user.chips}} <img class="chip" :src="chipImg" alt="chip"></td>
      </tr>
    </table>
    </div>
    
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
.user-table {
  max-height: 300px;
  overflow: scroll;
}
</style>