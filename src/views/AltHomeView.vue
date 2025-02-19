<template>
  <div class="app">
    <Header :name-page="'Учебный Материал - Дисциплины'" :is-main="true" />
    <Filters @applyFilters="applyFilters" @resetFilters="resetFilters" />
    <main class="content">
      <AddProgram @addProgram="addDiscipline" />
      <div class="list-container">
        <ProgramList
          :is-main="true"
          :programs="filteredDisciplines"
          @deleteProgram="deleteDiscipline"
          @editProgram="editDiscipline"
          @animateList="animateList"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Filters from '../components/Filters.vue'
import AddProgram from '../components/AddProgram.vue'
import ProgramList from '../components/ProgramList.vue'
import { useAnimate } from 'vue-motion-one'
import { useProgramsStore } from '../store/useProgramsStore'

const store = useProgramsStore()

const { play, reset } = useAnimate(
  '.list-container',
  { y: -20, opacity: 0 },
  {
    duration: 0.5,
    easing: [0.22, 0.03, 0.26, 1],
  },
)

// Фильтры
const filters = ref({
  name: '',
  attributes: [],
})

const filteredDisciplines = computed(() => {
  store.disciplines.forEach((discipline) => {
    console.log(discipline.title) // Выведет объект дисциплины
  })
  console.log(store.disciplines) // Выведет полный массив дисциплин
  return store.disciplines.filter((discipline) => {
    return (
      (!filters.value.name ||
        discipline.title.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.attributes.length === 0 ||
        filters.value.attributes.every((attr) => discipline.attributes.includes(attr)))
    )
  })
})

const applyFilters = (newFilters) => {
  filters.value = newFilters
}

const resetFilters = () => {
  filters.value = { title: '', attributes: [] }
}

// Добавление новой дисциплины
const addDiscipline = (newDiscipline) => {
  store.disciplines.push({
    title: newDiscipline.title,
    attributes: newDiscipline.attributes || [],
    programs: [],
  })
}

// Удаление дисциплины
const deleteDiscipline = () => {
  play()
  setTimeout(() => reset(), 1000)
}

const animateList = () => {
  console.log('Loading...')
  play()
  setTimeout(() => reset(), 1000)
}

// Редактирование дисциплины (изменение названия или атрибутов)
const editDiscipline = (updatedDiscipline) => {
  const index = store.disciplines.findIndex(
    (discipline) => discipline.title === updatedDiscipline.oldTitle,
  )
  if (index !== -1) {
    store.disciplines[index].title = updatedDiscipline.newTitle
    store.disciplines[index].attributes = updatedDiscipline.newAttributes
  }
}
</script>

<style>
.app {
  background: #f6f3f3;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  width: 90%;
  margin-top: 20px;
}
</style>
