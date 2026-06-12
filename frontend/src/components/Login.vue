<script setup>
import {ref} from 'vue'
const id = ref("")
</script>

<template>
  <h3>Логин</h3>
  <p class="hint">Максон сказал тебе секретный код скопируй его в поле ниже.</p>
  <p class="hint secondary">(если не сказал, тебя здесь не ждут)</p>
  <input v-model="id" type="text" placeholder="Секретный код"/>
  <button> Войти</button>
</template>

<style>
.hint {
  font-size: 11px;
}
.hint.secondary {
  font-size: 8px;
}
</style>