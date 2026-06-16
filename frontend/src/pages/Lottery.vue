
<script setup>
  import { computed, onMounted, ref } from 'vue';
  import bell from '../assets/bell.png'
  import cherry from '../assets/cherry.png'
  import clover from '../assets/clover.png'
  import diamond from '../assets/diamond.png'
  import horseshoe from '../assets/horseshoe.png'
  import lemon from '../assets/lemon.png'
  import seven from '../assets/seven.png'
  import { api } from '../api';
  import { useStore } from '../store';

  const store = useStore()

  const images = { bell, cherry, clover, diamond, horseshoe, lemon, seven }

  const props = defineProps({
    user: Object
  })

  const symbols = ref([])
  const selectedSlot = ref(0)

  onMounted(()=> {
    if (props.user.lotteryTicket) {
      symbols.value = props.user.lotteryTicket.split(',')
      selectedSlot.value = NaN
    }
  })

  const inputToSlot = (name) => {
    symbols.value[selectedSlot.value] = name
    selectedSlot.value = (selectedSlot.value + 1) % 3
  }

  const canSave = computed(() => {
    if (symbols.value.length < 3) return false
    return symbols.value.every(Boolean)
  })

  const save = async () => {
    await api.setLotteryTicket(symbols.value.join(','))
    await store.getUser()
  }

  const select = (i) => {
    if (!props.user.lotteryTicket)
    selectedSlot.value = i - 1
  }

</script>

<template>
  <h3>Лотерея</h3>
  <div class="slots">
    <div 
      v-for="i in 3" 
      class="slot pixel-border" 
      :class="{selected: selectedSlot +1 === i}"
      @click="select(i)"
    >
      <img :src="images[symbols[i-1]]" :alt="symbols[i-1]">
    </div>
   
  </div>
  <template v-if="!props.user.lotteryTicket" >
    <div class="box symbol-choises pixel-border">
      <img class="symbol-choise" v-for="(image, name) in images" :src="image" :alt="name" @click="inputToSlot(name)">
    </div>
    <button 
      class="pixel-border"
      style="margin-bottom: 0"
      :disabled="!canSave"
      @click="save"
    >
      Сохранить
    </button>
    <p class="hint secondary">Внимание!!! После сохранения<br>символы нельзя будет поменять!</p>
  </template>
  <p class="hint secondary">Это твои символы для лотереи в конце вечера</p>

  
</template>

<style scoped>
  .slots {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 16px 0;
  }

  .slot,
  .box {
    background-color: #565a5e;
    --pixel-color: #485361;
  }
  .slot {
    height: 50px;
    width: 50px;
  }

  .slot.selected {
    --pixel-color: #fff71d;
  }

  .slot img {
    height: 100%;
  }

  .symbol-choises {
    width: 182px;
    text-align: center;
    margin-bottom: 16px;
  }
  .symbol-choise{
    height: 45px;
  }
</style>