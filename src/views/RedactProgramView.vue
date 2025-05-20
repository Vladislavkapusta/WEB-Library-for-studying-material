<template>
  <div class="redact-program">
    <header>
      <span class="admin">Admin 👤</span>
      <h1>{{ isEditing ? 'Редактирование программы' : 'Добавление программы' }}</h1>
      <h2>в дисциплину {{ disciplineName }}</h2>
      <button class="cancel" @click="goBack">отмена</button>
    </header>

    <div class="input-group">
      <input v-model="programName" placeholder="Введите название программы" />
      <input v-model="programAttributes" placeholder="Атрибуты программы" />
    </div>

    <div class="media-upload" @dragover.prevent @drop.prevent="handleDrop" @dragenter="dragEnter" @dragleave="dragLeave" :class="{ 'drag-over': isDragging }">
      <p>Перетащите медиафайлы сюда или нажмите для выбора 📎</p>
      <input type="file" multiple @change="handleFileInput" style="display: none" ref="fileInput" />
      <button class="file-input-button" @click="$refs.fileInput.click()">Выбрать файлы</button>
    </div>

    <div class="media-preview" v-if="mediaFiles.length">
      <div v-for="(file, index) in mediaFiles" :key="index" class="media-item">
        <img v-if="file.type.startsWith('image/')" :src="file.url" alt="Preview" />
        <p v-else>{{ file.name }} ({{ file.type }})</p>
        <button @click="removeMedia(index)">Удалить</button>
      </div>
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

const disciplineName = ref(route.params.disciplineTitle )
const programId = ref(route.params.id ? Number(route.params.id) : null)
const isEditing = computed(() => programId.value !== null)

const programName = ref('')
const programAttributes = ref('')
const sections = ref([{ text: '' }])
const mediaFiles = ref([]) // Хранит загруженные медиафайлы
const isDragging = ref(false) // Для стилизации drag-and-drop зоны
const fileInput = ref(null) // Ссылка на input для выбора файлов

onMounted(() => {
  if (isEditing.value) {
    const programs = store.getProgramsByDiscipline(disciplineName.value)
    const program = programs.find((p) => p.id === programId.value)

    if (program) {
      programName.value = program.title
      programAttributes.value = program.attributes.join(', ')
      sections.value = program.sections.length ? [...program.sections] : [{ text: '' }]
      mediaFiles.value = program.media || [] // Загружаем медиа из store, если есть
    }
  }
})

const addSection = () => {
  sections.value.push({ text: '' })
}

const goBack = () => {
  router.go(-1)
}

const dragEnter = () => {
  isDragging.value = true
}

const dragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  processFiles(files)
}

const handleFileInput = (event) => {
  const files = event.target.files
  processFiles(files)
}

const processFiles = (files) => {
  for (const file of files) {
    const fileData = {
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file), // Создаем временный URL для предпросмотра
    }
    mediaFiles.value.push(fileData)
  }
}

const removeMedia = (index) => {
  mediaFiles.value.splice(index, 1)
}

const publish = () => {
  const newProgram = {
    id: programId.value || Date.now(),
    title: programName.value,
    attributes: programAttributes.value.split(',').map((attr) => attr.trim()),
    sections: sections.value,
    media: mediaFiles.value, // Добавляем медиафайлы в программу
  }

  if (isEditing.value) {
    store.editProgram(disciplineName.value, newProgram)
  } else {
    store.addProgram(disciplineName.value, newProgram)
  }
  router.go(-1)
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
  height: 100%;
}
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
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
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
}
.media-upload.drag-over {
  background: #d81b60;
  color: white;
}
.file-input-button{
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
}
.media-preview {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}
.media-item {
  background: #fff;
  color: black;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.media-item img {
  max-width: 100px;
  max-height: 100px;
}
.section{
  width: 100%;
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