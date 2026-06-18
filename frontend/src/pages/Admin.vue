
<script setup>
  import { computed, onMounted,ref } from 'vue'
  import { useStore } from '../store';
  import { useRouter } from 'vue-router';
  import chipImg from '../assets/chip.png'
  import { api } from '../api';
import LotteryAdmin from '../components/LotteryAdmin.vue';
import Karaoke from '../components/Karaoke.vue';

  const store = useStore()
  const router = useRouter()

  const users = ref([])
  const newUser = ref("")
  const sum = ref(0)
  const tab = ref("new-user")
  const selectedUserId = ref()

  const addUser = async () => {
    await api.addUser(newUser.value)
    users.value = await api.getUsers()    
  }
  //const s =  ['bell', 'cherry', 'clover', 'diamond', 'horseshoe', 'lemon', 'seven' ]
  const s =  ['bell', 'clover', 'seven' ]


  const madShitDebug = () => {
    let total = 0
    const combinations = new Set()
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < s.length; j++) {
            for (let k = 0; k < s.length; k++) {
                const symbols = [s[i],s[j],s[k]].sort()
                total++
                combinations.add(symbols.join('-'))
            }
        }
    }
    console.log(combinations, total);
    
  }

  const sendMoney = async () => {
    await api.sendChips(selectedUserId.value, sum.value)
    users.value = await api.getUsers()
  }
  const symbols =  ['bell', 'cherry', 'clover', 'diamond', 'horseshoe', 'lemon', 'seven' ]

  onMounted(async () => {
    users.value = await api.getUsers()
  })
</script>

<template>
    <h2>Админка</h2>
    <div class="menu">
      <p class="menu-item" @click="tab = 'new-user'">Новый игрок</p> 
      <p class="menu-item" @click="tab = 'lottery'">Лотерея</p> 
      <p class="menu-item" @click="tab = 'karaoke'">Караоке</p> 
      <p class="menu-item" @click="router.push('/')">Назад</p> 
    </div>
    <template v-if="tab === 'new-user'">
      <input v-model="newUser" class="pixel-border" type="text" placeholder="Имя">
      <button class="pixel-border" @click="addUser">Добавить</button>
      <button class="pixel-border" @click="madShitDebug">Не нажимать!!!</button>
       <table>
        <tr v-for="user in users" :class="{chosen: user.id === selectedUserId}" :key="user.id">
          <td align="left" @click="selectedUserId = user.id">{{user.name}}</td>
          <td align="right">{{user.chips}} <img class="chip" :src="chipImg" alt="chip"></td>
        </tr>
      </table>
    </template>
    <template v-if="tab === 'lottery'">
      <LotteryAdmin/>
    </template>
    <template v-if="tab === 'karaoke'">
      <Karaoke/>
    </template>
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