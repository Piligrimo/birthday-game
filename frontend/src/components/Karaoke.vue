
<script setup>
  import { ref } from 'vue';
  import heart from '../assets/heart.png'
  import { receiveLikeListener } from "../api/socket";
  receiveLikeListener((name)=> {
    like(name)
  })
  const inputLink = ref('')
  const link = ref('')
  const heartCount = ref(0)
  const isFullScreen = ref(false)
  
  const onError = () =>{
    link.value = ''
  }

  const getVideo = () => {
    heartCount.value = 0
    link.value = inputLink.value.replace('watch?v=','embed/')
  }


  const like = (name) => {
        
    heartCount.value++
    hearstQue.value.push({
      id: Date.now(),
      x: Math.random() * window.screen.width, 
      y: Math.random() * window.screen.height, 
      name,
    })
  }

  const toggleFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
  }
  const hearstQue = ref([])
</script>

<template>
  <input v-model="inputLink" class="pixel-border" type="text" placeholder="Ссылка">
  <button class="pixel-border" @click="getVideo">Загрузить</button>
  <iframe :class="{fullscreen: isFullScreen}" :src="link" frameborder="0"></iframe>
  <div class="hearts">
    <div class="karaoke-ui">
      <div><img :src="heart"> {{ heartCount }}</div>
      <button class="pixel-border" @click="toggleFullScreen">
        {{ isFullScreen ? 'Свернуть' : 'Полный экран'  }}
      </button>

    </div>
    <div 
      v-for="h in hearstQue" 
      class="heart-container" 
      :style="{ top: h.y + 'px', left: h.x + 'px'}"
      :key="h.id"
      >
      <img 
        class="heart" 
        :src="heart" 
      >
      <span class="heart-name">{{ h.name }}</span>
    </div>
    
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

  .heart-container {
    position: absolute;
    animation: flying 4s;
    z-index: 999;
    opacity: 0;
  }

  .heart {
    position: absolute;
    height: 50px;
    width: 50px;
  }

  .heart-name {
    position: absolute;
    left: 0;
    bottom: 0;
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