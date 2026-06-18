
<script setup>
  import { computed, onMounted, ref } from 'vue';
  import bell from '../assets/bell.png'
  import cherry from '../assets/cherry.png'
  import clover from '../assets/clover.png'
  import diamond from '../assets/diamond.png'
  import horseshoe from '../assets/horseshoe.png'
  import lemon from '../assets/lemon.png'
  import seven from '../assets/seven.png'
  import confetti from '../assets/confetti.gif'
  import { api } from '../api';
  import { useStore } from '../store';

  const store = useStore()

  const winningCombination = ref(null)

  const images = { bell, cherry, clover, diamond, horseshoe, lemon, seven }

  const finishedIndexes = ref([false, false, false])
  const allFinished = ref(false)

  const spin = (slotIndex, iterationsLeft, delay) => {
    if (iterationsLeft < 0) {
      symbols.value[slotIndex] = winningCombination.value[slotIndex]
      finishedIndexes.value[slotIndex] = true
      if (finishedIndexes.value.every(Boolean)) {
        allFinished.value = true
        setTimeout(() => {
          allFinished.value = false
        }, 2530)
      }      
    } else {
      setTimeout(()=>{
        const names = Object.keys(images)
        let random = Math.floor(Math.random() * names.length)
        if (symbols.value[slotIndex] === names[random]) {
          random = random + 1 % names.length
        }
        symbols.value[slotIndex] = names[random]
        spin(slotIndex, iterationsLeft-1, delay+10*Math.random())
      }, delay)
    }
  }

  const props = defineProps({
    user: Object
  })

  const symbols = ref(['seven','seven','seven'])
  
  const beginSpinning = async () => {
    const {winners, combination} = await api.getLotteryWinners()
    console.log({winners, combination});
    
    winningCombination.value = combination.split(',')
    allFinished.value = false
    finishedIndexes.value = [false, false, false]
    setTimeout(()=> {
      spin(0,50, 40)
    }, 100)
    setTimeout(()=> {
      spin(1,40, 70)

    }, 400)
    setTimeout(()=> {
      spin(2,65, 30)
    }, 700)
  }

</script>

<template>
  <h3>Лотерея</h3>
  <div class="slots">
    <div 
      v-for="i in 3" 
      class="slot pixel-border" 
      :class="{selected: finishedIndexes[i-1]}"
      @click="select(i)"
    >
    <Transition name="slide-up">
      <img :src="images[symbols[i-1]]" :key="symbols[i-1]" :alt="symbols[i-1]">
    </Transition>
    </div>
  </div>
  <button class="pixel-border" @click="beginSpinning">Крутим</button>
  <div v-if="allFinished" class="confetti">
    <img :src="confetti" >
  </div>
</template>

<style scoped>
  .slots {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin: 16px 0;
  }

  .slot,
  .box {
    background-color: #565a5e;
    --pixel-color: #485361;
    --pixel-width: 10px;
  }
  .slot {
    height: 150px;
    width: 150px;
    overflow: hidden;
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
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.1s linear;
  }

  .slide-up-enter-from {
    opacity: 0.5;
    transform: translateY(100px);
    filter: blur(20px);
  }

  .slide-up-leave-to {
    opacity: 0.5;
    filter: blur(20px);
    transform: translateY(-100px);
  }
  .slot.selected {
    --pixel-color: #fff71d;
  }

  .confetti {
    position: absolute;
    top: 0;
    left: 0;
    height: 100dvh;
    width: 100dvw;
  }

  .confetti img {
    height: 100%;
    width: 100%;
  }
</style>