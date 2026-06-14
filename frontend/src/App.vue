<script setup>
</script>

<template>
  <h1>Казино Максон</h1>
  <RouterView></RouterView>
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

  button,
  input {
    max-width: 200px;
    margin: 8px 0;
  }
</style>