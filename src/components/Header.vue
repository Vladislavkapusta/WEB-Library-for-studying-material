<template>
  <header class="header">
    <div class="user" @click="openProfile">Admin</div>
    <h1 class="title">{{ namePage }}</h1>

    <div class="top-bar" v-if="!isMain">
      <button @click="goBack" class="back-button">🔙 Вернуться к дисциплинам</button>
    </div>
  </header>
</template>

<script setup>
import router from '@/router'

defineProps({ namePage: String, isMain: Boolean })

const openProfile = () => {
  console.log('Открытие личного кабинета')
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.header {
  width: 100%;
  background: linear-gradient(90deg, #3b003d, #000d3d);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
}

.user {
  cursor: pointer;
  font-weight: bold;
}

.title {
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
}
</style>
