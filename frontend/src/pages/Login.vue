<script setup>
import { ref } from 'vue'
import { api } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter()
const code = ref("")

const signIn = async () => {
  try {
    await api.login(code.value)
    router.push('/')
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <h3>Логин</h3>
  <p class="hint">Максон сказал тебе секретный код скопируй его в поле ниже</p>
  <p class="hint secondary">(если не сказал, тебя здесь не ждут)</p>
  <input class="pixel-border" v-model="code" type="text" placeholder="Секретный код"/>
  <button class="pixel-border" @click="signIn"> Войти</button>
</template>

<style>
.hint {
  font-size: 11px;
}
.hint.secondary {
  font-size: 8px;
}
</style>