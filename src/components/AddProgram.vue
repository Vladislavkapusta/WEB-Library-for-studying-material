<template>
  <div>
    <button v-if="!isUser" @click="openForm" class="add-btn">
      Добавить новый материал <span class="plus">+</span>
    </button>

    <div v-if="showForm" class="form-container">
      <input v-model="newProgram.title" placeholder="Введите название" class="form-input" />
      <input v-model="newAttributes" placeholder="Атрибуты (через запятую)" class="form-input" />
      <div class="form-actions">
        <button @click="submitProgram" class="submit-btn">Добавить</button>
        <button @click="DenySubmit" class="cancel-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { animate, stagger } from 'motion'
import { ref, defineEmits, onMounted, computed  } from 'vue'
import { useAnimate } from 'vue-motion-one'
import { useUsersStore } from '@/store/users' 



const showForm = ref(false)
const newProgram = ref({ title: '', attributes: [] })
const newAttributes = ref('')

const emit = defineEmits(['addProgram'])

const usersStore = useUsersStore()

// Проверяем, является ли текущий пользователь User
const isUser = computed(() => {
  return usersStore.currentUser?.type === 'User'
})

const openForm = () => {
  setTimeout(() => animate('.program-list', { y: 200 }, { duration: 1 }), 1)
  showForm.value = true
  setTimeout(() => animate('.form-container', { y: -20, opacity: 1 }, { duration: 0.5 }), 1)
}

const submitProgram = () => {
  if (newProgram.value.title.trim()) {
    animate('.form-container', { y: 20, opacity: 0 }, { duration: 0.5 })
    setTimeout(() => animate('.program-list', { y: 0 }, { duration: 1 }), 1)
    setTimeout(
      () => (
        (newProgram.value.attributes = newAttributes.value.split(',').map((attr) => attr.trim())),
        emit('addProgram', newProgram.value),
        console.log(newAttributes.value.split(',').map((attr) => attr.trim())),
        (newProgram.value = { title: '', attributes: [] }),
        (newAttributes.value = ''),
        (showForm.value = false)
      ),
      1000,
    )
  }
}

const DenySubmit = () => {
  animate('.form-container', { y: 20, opacity: 0 }, { duration: 0.5 })
  setTimeout(() => animate('.program-list', { y: 0 }, { duration: 1 }), 1)
  setTimeout(() => (showForm.value = false), 1)
}
</script>

<style scoped>
.add-btn {
  align-self: center;
  width: 100%;
  background: #d9a7f0;
  color: #3b003d;
  border: none;
  padding: 15px;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
}

.plus {
  font-size: 1.5rem;
}

.form-container {
  opacity: 0;
  width: 90%;
  position: absolute;
  background: white;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.submit-btn,
.cancel-btn {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn {
  background: #3b003d;
  color: white;
}

.cancel-btn {
  background: #ccc;
}
</style>
