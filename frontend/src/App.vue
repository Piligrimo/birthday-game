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
    background-image: url(background.png);
    background-size: 256px;
    image-rendering: -o-crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    image-rendering: pixelated;
    margin: 0;
  }
  @font-face {
    font-family: 'pixelFont'; /* set name */
    src: url(assets/LCD40x2Display-Regular.otf) format('opentype'); /* url of the font */
    font-weight: normal;
    font-style: normal;
    size-adjust: 60%; 
  }
  @font-face {
    font-family: 'pixelFontFat'; /* set name */
    src: url(assets/web_ibm_mda.ttf) format('truetype'); /* url of the font */
  }

  #app {
    color: #dbf3e5;
    font-family: 'pixelFont', system-ui;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :root {
    --pixel-color: #6a83a1;
    --pixel-width: 4px;
  }

  button {
    --pixel-color: #908818;
    background-color: #ede026;
    color: #58530a;
  }

  button:disabled {
    --pixel-color: #343434;
    background-color: #949494;
    color: #343434;
  }

  button:active {
    transform: translate(0,var(--pixel-width));
  }

  button,
  input {
    font-family: 'pixelFont', system-ui;
    max-width: 200px;
    margin: 8px 0;
    padding: 10px 15px;
  }

  h1,h2,h3,h4 {
    margin: 0.5rem 0;
    font-family: 'pixelFontFat', system-ui;

  }

  .pixel-border {
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 
      0px var(--pixel-width) 0px 0px var(--pixel-color),
      0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
      calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
      var(--pixel-width) 0px 0px 0px var(--pixel-color);
    -moz-box-shadow: 
      0px var(--pixel-width) 0px 0px var(--pixel-color),
      0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
      calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
      var(--pixel-width) 0px 0px 0px var(--pixel-color);
    box-shadow: 
      0px var(--pixel-width) 0px 0px var(--pixel-color),
      0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
      calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
      var(--pixel-width) 0px 0px 0px var(--pixel-color);
  }

  .chosen {
    color: #fff71d;
  }
  .hint {
    font-size: 11px;
  }
  .hint.secondary {
    font-size: 8px;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .menu-item {
    font-size: 10px;
    color: #dbf3e5;
  }
   .menu-item:visited {
    color: #dbf3e5;
   }

  .menu-item:hover {
    opacity: 0.8;
  }
</style>