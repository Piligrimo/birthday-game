
<script setup>
  import { ref } from 'vue';
  import heart from '../assets/heart.png'

  const inputLink = ref('')
  const link = ref('')
  const heartCount = ref(0)
  const isFullScreen = ref(false)
  const onError = () =>{
    link.value = ''
  }

  const getVideo = () => {
    heartCount.value = 0
    setInterval(like, 500)
    link.value = inputLink.value.replace('watch?v=','embed/')
  }


  const like = () => {
        
    heartCount.value++
    hearstQue.value.push({
      id: Date.now(),
      x: Math.random() * window.screen.width, 
      y: Math.random() * window.screen.height, 
    })
  }

  const toggleFullScreen = () => {
    console.log('toggleFullScreen');
    
    isFullScreen.value = !isFullScreen.value
  }
  const hearstQue = ref([])
</script>

<template>
  <input v-model="inputLink" class="pixel-border" type="text" placeholder="Ссылка">
  <button class="pixel-border" @click="getVideo">Загрузить</button>
  <button class="pixel-border" @click="like">Like</button>
  <iframe :class="{fullscreen: isFullScreen}" :src="link" frameborder="0"></iframe>
  <div class="hearts">
    <div class="karaoke-ui">
      <div><img :src="heart"> {{ heartCount }}</div>
      <button class="pixel-border" @click="toggleFullScreen">
        {{ isFullScreen ? 'Свернуть' : 'Полный экран'  }}
      </button>

    </div>
    <img 
      v-for="h in hearstQue" 
      :key="h.id" 
      class="heart" 
      :src="heart" 
      :style="{ top: h.y + 'px', left: h.x + 'px'}"
    >
  </div>
</template>


<style scoped>
  .hearts {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    pointer-events: none
  }

  .heart {
    height: 50px;
    width: 50px;
    position: absolute;
    animation: flying 4s;
    top: 50%;
    left: 50%;
    z-index: 999;
    opacity: 0;
  }

  @keyframes flying {
    0% {  
      transform: translate(0,0) scale(0, 0); 
      opacity: 1;
    }
    10% {  
      transform: translate(0,0) scale(0.1, 0.1); 
      opacity: 1;
    }
    70% {  
      opacity: 1;
    }
    100% {  
      transform: translate(0,-250px) scale(1, 1); 
      opacity: 0;
    }
  }

  .karaoke-ui {
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: all;
    z-index: 999;
  }

  .fullscreen {
    position: absolute;
    height: 100dvh;
    width: 100dvw;
    top: 0;
    left: 0;
    z-index: 998;

  }

</style>