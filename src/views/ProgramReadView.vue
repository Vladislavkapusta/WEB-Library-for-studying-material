<template>
  <div class="program-read-view">
    <!-- Хедер -->
    <header class="header">
      <button @click="goBack" class="back-btn">⬅</button>
      <h1>{{ program?.title }}</h1>
      <p>{{ program?.attributes.join(', ') }}</p>
      <button @click="goToProfile" class="profile-btn">👤</button>
    </header>

    <!-- Медиа блок -->
    <div class="media-container" v-if="program?.media?.length">
      <div v-for="(media, index) in program.media" :key="index" class="media-item">
        <img v-if="media.type.startsWith('image/')" :src="media.url" alt="Media" />
        <p v-else>{{ media.name }} ({{ media.type }})</p>
      </div>
    </div>
    <div class="media-container" v-else>
      <p>Медиафайлы отсутствуют</p>
    </div>

    <!-- Основное содержимое программы -->
    <div class="content">
      <div v-for="(section, index) in program?.sections" :key="index" class="section">
        <p>{{ section.text }}</p>
      </div>
    </div>

    <!-- Кнопка добавления в пройденное (только для User) -->
    <button
      v-if="currentUser?.type === 'User'"
      class="complete-btn"
      @click="markAsCompleted"
    >
      Добавить в пройденное
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgramsStore } from '@/store/programs'
import { useUsersStore } from '@/store/users'

const route = useRoute()
const router = useRouter()
const programsStore = useProgramsStore()
const usersStore = useUsersStore()

// Получаем текущего пользователя
const currentUser = computed(() => usersStore.currentUser)

// Получаем ID программы из параметров маршрута
const programId = Number(route.params.programId)

// Получаем программу из store по её ID
const program = computed(() => {
  return programsStore.disciplines
    .flatMap((discipline) => discipline.programs)
    .find((p) => p.id === programId)
})

const goBack = () => {
  router.go(-1)
}

const goToProfile = () => {
  router.push('/profile')
}

const markAsCompleted = () => {
  if (program.value && currentUser.value?.type === 'User') {
    usersStore.addCompletedProgram(programId)
    console.log(`Программа "${program.value.title}" добавлена в пройденное!`)
  }
}
</script>

<style scoped>
.program-read-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  background: linear-gradient(135deg, #3b003d, #a53188);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.back-btn,
.profile-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

h1 {
  font-size: 24px;
  margin: 0;
}

p {
  margin: 5px 0;
  font-size: 16px;
  opacity: 0.8;
}

.media-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.media-item {
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.media-item img {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}

.content {
  margin-bottom: 20px;
}

.section {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.complete-btn {
  background: #ff4b5c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
