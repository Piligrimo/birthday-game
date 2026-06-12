<script setup>
import Login from './components/Login.vue'
</script>

<template>
  <h1>Казино Максон</h1>
  <Login />
</template>

<style>
  *{
    box-sizing: border-box;
  }
  body {
    background-color: #1c6b3e;
    color: #dbf3e5;
    
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    max-width: 200px;
  }
</style>