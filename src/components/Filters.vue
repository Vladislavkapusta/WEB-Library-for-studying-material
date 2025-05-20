<template>
  <div class="filters">
    <input v-model="nameFilter" placeholder="Поиск по названию" class="filter-input" />

    <select v-model="selectedAttribute" class="filter-select">
      <option value="">Выберите атрибут</option>
      <option v-for="attr in availableAttributes" :key="attr" :value="attr">{{ attr }}</option>
    </select>

    <button @click="applyFilters" class="apply-btn">Применить</button>
    <button @click="resetFilters" class="reset-btn">Сбросить</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProgramsStore } from '@/store/programs'

const emit = defineEmits(['applyFilters', 'resetFilters'])
const route = useRoute()
const programsStore = useProgramsStore()

const nameFilter = ref('')
const selectedAttribute = ref('')

// Определяем, находимся ли мы на главной странице или на странице программ
const isMainPage = computed(() => !route.params.discipline)

// Собираем уникальные атрибуты в зависимости от страницы
const availableAttributes = computed(() => {
  const attributesSet = new Set()

  if (isMainPage.value) {
    // На главной странице собираем атрибуты дисциплин
    programsStore.disciplines.forEach((discipline) => {
      discipline.attributes.forEach((attr) => attributesSet.add(attr))
    })
  } else {
    // На странице ProgramListPage собираем атрибуты программ
    const disciplineTitle = route.params.discipline
    const programs = programsStore.getProgramsByDiscipline(disciplineTitle)
    programs.forEach((program) => {
      program.attributes.forEach((attr) => attributesSet.add(attr))
    })
  }

  return Array.from(attributesSet)
})

const applyFilters = () => {
  emit('applyFilters', {
    name: nameFilter.value,
    attributes: selectedAttribute.value ? [selectedAttribute.value] : [],
  })
}

const resetFilters = () => {
  nameFilter.value = ''
  selectedAttribute.value = ''
  emit('resetFilters')
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #3b003d, #000d3d);
  width: 100%;
  padding: 15px;
}

.filter-input,
.filter-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.apply-btn,
.reset-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.apply-btn {
  background: #3b003d;
  color: white;
}

.reset-btn {
  background: #ccc;
}
</style>