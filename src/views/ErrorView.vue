<script setup lang="ts">
import { onMounted } from 'vue'
import { useAnimate } from 'vue-motion-one'

const { play, isFinished } = useAnimate(
  '.listItem',
  { y: -20, opacity: 0 },
  {
    delay: 1,
    duration: 0.5,
    easing: [0.22, 0.03, 0.26, 1],
  },
)

// onMounted(() => {
//   play()
// })
//
</script>

<template>
  <div class="App">
    <button :disabled="isFinished" @click="play">Replay</button>

    <ul class="list">
      <li class="listItem">Buy a Turtle</li>
      <li class="listItem">
        Name him
        <p>"The Speed of Light"</p>
      </li>
      <li class="listItem">
        Claim that you can Run faster
        <p>Than the "The Speed of Light"</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  height: 100vh;
}

.App button {
  border: 1px solid #e4e4e4;
  padding: 5px 15px;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: 0.3s all;
}

.App button:disabled {
  cursor: not-allowed;
}

.list {
  list-style: none;
}

.listItem {
  opacity: 1;
  border: 1px solid #e5e5e5;
  margin: 1rem 0;
  padding: 14px 15px;
  border-radius: 0.3rem;
  font-weight: 500;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: black;
}

.listItem p {
  font-size: 14px;
  font-weight: 400;
  margin: 4px 0 0 0;
  color: black;
}
</style>
