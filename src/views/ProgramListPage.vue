<template>
  <div class="app">
    <Header :namePage="nameOfPage" />
    <Filters @applyFilters="applyFilters" @resetFilters="resetFilters" />
    <main class="content">
      <AddProgram @addProgram="addProgram" />
      <div class="list-container">
        <ProgramList
          :programs="filteredPrograms"
          @deleteProgram="deleteProgram"
          @editProgram="editProgram"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgramsStore } from '@/store/useProgramsStore'
import Header from '@/components/Header.vue'
import Filters from '@/components/Filters.vue'
import AddProgram from '@/components/AddProgram.vue'
import ProgramList from '@/components/ProgramList.vue'
import { useAnimate } from 'vue-motion-one'
import { stagger } from 'motion'
const { play, reset } = useAnimate(
  '.app',
  { y: -20, opacity: 1 },
  {
    delay: stagger(0.1),
    duration: 0.5,
    easing: [0.22, 0.03, 0.26, 1],
  },
)

const route = useRoute()
const router = useRouter()
const programsStore = useProgramsStore()

const discipline = ref(route.params.discipline || 'Неизвестно')

const nameOfPage = 'Программы по ' + route.params.discipline

const filters = ref({ name: '', attributes: [] })

const programs = computed(() => programsStore.getProgramsByDiscipline(discipline.value))

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
  programsStore.addProgram(discipline.value, newProgram)
}

const deleteProgram = (id) => {
  programsStore.deleteProgram(discipline.value, id)
}

const editProgram = (updatedProgram) => {
  programsStore.editProgram(discipline.value, updatedProgram)
}

onMounted(() => {
  discipline.value = route.params.discipline || 'Неизвестно'
  play()
})
</script>

<style scoped>
.app {
  padding-top: 20px;
}
.program-list-page {
  background: #f6f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.back-button {
  background: #3b003d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #3b003d;
  margin: 20px 0;
}
</style>
