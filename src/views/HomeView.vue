<template>
  <div class="app">
    <Header :name-page="'Учебный Материал - Дисциплины'" :is-main="true" />
    <Filters @applyFilters="applyFilters" @resetFilters="resetFilters" />
    <main class="content">
      <AddProgram @addProgram="addProgram" />
      <div class="list-container">
        <ProgramList
          :is-main="true"
          :programs="filteredPrograms"
          @deleteProgram="deleteProgram"
          @editProgram="editProgram"
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

const { play, reset } = useAnimate(
  '.list-container',
  { y: -20, opacity: 0 },
  {
    duration: 0.5,
    easing: [0.22, 0.03, 0.26, 1],
  },
)

const programs = ref([
  { id: 1, name: 'HTML, CSS', attributes: ['IT', 'Артефакты'] },
  {
    id: 2,
    name: 'JavaScript',
    attributes: ['IT', 'Артефакты', 'Frontend', 'Backend', 'Design'],
  },
])

const filters = ref({
  name: '',
  attributes: [],
})

const filteredPrograms = computed(() => {
  return programs.value.filter((program) => {
    return (
      (!filters.value.name ||
        program.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.attributes.length === 0 ||
        filters.value.attributes.every((attr) => program.attributes.includes(attr)))
    )
  })
})

const applyFilters = (newFilters) => {
  filters.value = newFilters
}

const resetFilters = () => {
  filters.value = { name: '', attributes: [] }
}

const addProgram = (newProgram) => {
  programs.value.push({ id: Date.now(), ...newProgram })
}

const deleteProgram = (id) => {
  programs.value = programs.value.filter((program) => program.id !== id)
  //  console.log(id)
  play()
  // reset()
  setTimeout(() => reset(), 1000)
}

const editProgram = (updatedProgram) => {
  const index = programs.value.findIndex((program) => program.id === updatedProgram.id)
  if (index !== -1) {
    programs.value[index] = updatedProgram
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
