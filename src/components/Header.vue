<template>
  <header class="header">
    <div class="user" @click="openProfile">
      {{ currentUser ? currentUser.login : 'Login' }}
    </div>
    <h1 class="title">{{ namePage }}</h1>

    <div class="top-bar" v-if="!isMain">
      <button @click="goBack" class="back-button">🔙 Вернуться к дисциплинам</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/store/users'

defineProps({ namePage: String, isMain: Boolean })

const router = useRouter()
const usersStore = useUsersStore()

// Получаем текущего пользователя из store
const currentUser = usersStore.currentUser

const openProfile = () => {
  if (currentUser) {
    // Если пользователь авторизован, перенаправляем в личный кабинет
    router.push('/profile')
  } else {
    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    router.push('/login')
  }
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

.back-button{
  background: none;
  border: none;
  color: white;
}
</style>