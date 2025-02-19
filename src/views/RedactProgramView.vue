<template>
  <div class="redact-program">
    <header>
      <span class="admin">Admin 👤</span>
      <h1>{{ isEditing ? 'Редактирование программы' : 'Добавление программы' }}</h1>
      <h2>в дисциплину {{ disciplineName }}</h2>
      <button class="cancel" @click="cancel">отмена</button>
    </header>

    <div class="input-group">
      <input v-model="programName" placeholder="Введите название программы" />
      <input v-model="programAttributes" placeholder="Атрибуты программы" />
    </div>

    <div class="media-upload">
      <button>Добавьте медиафайлы 📎</button>
    </div>

    <div v-for="(section, index) in sections" :key="index" class="section">
      <textarea
        v-model="section.text"
        :placeholder="`Текст раздела ${index + 1} здесь:`"
      ></textarea>
    </div>

    <button class="add-section" @click="addSection">Добавить новый раздел ➕</button>
    <button class="publish" @click="publish">
      {{ isEditing ? 'Сохранить изменения' : 'Опубликовать' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProgramsStore } from '@/store/programs'

const router = useRouter()
const route = useRoute()
const store = useProgramsStore()

const disciplineName = ref(route.params.discipline || 'HTML, CSS')
const programId = ref(route.params.id ? Number(route.params.id) : null)
const isEditing = computed(() => programId.value !== null)

const programName = ref('')
const programAttributes = ref('')
const sections = ref([{ text: '' }])

onMounted(() => {
  if (isEditing.value) {
    const programs = store.getProgramsByDiscipline(disciplineName.value)
    const program = programs.find((p) => p.id === programId.value)

    if (program) {
      programName.value = program.title
      programAttributes.value = program.attributes.join(', ')
      sections.value = program.sections.length ? [...program.sections] : [{ text: '' }]
    }
  }
})

const addSection = () => {
  sections.value.push({ text: '' })
}

const cancel = () => {
  router.push('/')
}

const publish = () => {
  const newProgram = {
    id: programId.value || Date.now(),
    title: programName.value,
    attributes: programAttributes.value.split(',').map((attr) => attr.trim()),
    sections: sections.value,
  }

  if (isEditing.value) {
    store.editProgram(disciplineName.value, newProgram)
  } else {
    store.addProgram(disciplineName.value, newProgram)
  }

  router.push('/')
}
</script>

<style scoped>
.redact-program {
  background: linear-gradient(to right, #2c003e, #6a0080);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: white;
}
.admin {
  font-size: 14px;
}
.cancel {
  color: red;
  background: none;
  border: none;
  cursor: pointer;
}
.input-group {
  width: 100%;
  display: flex;
  gap: 10px;
}
input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
}
.media-upload {
  background: #e1bee7;
  width: 100%;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
}
.section textarea {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
}
.add-section,
.publish {
  background: #e1bee7;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
}
.publish {
  background: lightblue;
}
</style>
