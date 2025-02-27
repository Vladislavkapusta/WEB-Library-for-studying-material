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
    <div class="media-container">
      <img v-for="(image, index) in mediaFiles" :key="index" :src="image" class="media-item" />
    </div>

    <!-- Основное содержимое программы -->
    <div class="content">
      <div v-for="(section, index) in program?.sections" :key="index" class="section">
        <p>{{ section.text }}</p>
      </div>
    </div>

    <!-- Кнопка добавления в пройденное -->
    <button class="complete-btn" @click="markAsCompleted">Добавить в пройденное</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgramsStore } from '@/store/useProgramsStore'

const route = useRoute()
const router = useRouter()
const store = useProgramsStore()

// Получаем программу по её ID из URL
const programId = Number(route.params.programId)
console.log(programId)
const program = computed(() => {
  return store.disciplines
    .flatMap((discipline) => discipline.programs)
    .find((p) => p.id === programId)
})

// Массив медиафайлов (замени ссылками на изображения, если нужно)
const mediaFiles = ref(['/images/media1.png', '/images/media2.png', '/images/media3.png'])

const goBack = () => {
  router.go(-1)
}

const goToProfile = () => {
  router.push('/profile')
}

const markAsCompleted = () => {
  console.log(`Программа "${program.value?.name}" добавлена в пройденное!`)
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
  gap: 10px;
  margin: 20px 0;
}

.media-item {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.content {
  max-width: 800px;
  width: 100%;
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
