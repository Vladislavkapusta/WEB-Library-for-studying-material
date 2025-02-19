<template>
  <div class="program-card">
    <button @click="(play(), $emit('deleteProgram', program.id))" class="delete-btn">🗑</button>
    <div class="program-info" @click="openProgram">
      <h3>{{ program.name }}</h3>
      <p>{{ program.attributes.join(', ') }}</p>
    </div>
    <button @click="editProgram" class="edit-btn">✏</button>

    <div v-if="isEditing" class="edit-modal">
      <input v-model="editedName" placeholder="Название программы" class="modal-input" />
      <input
        v-model="editedAttributes"
        placeholder="Атрибуты (через запятую)"
        class="modal-input"
      />
      <div class="modal-actions">
        <button @click="saveEdit" class="save-btn">Сохранить</button>
        <button @click="isEditing = false" class="cancel-btn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { animate, hover, press, stagger } from 'motion'
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useAnimate } from 'vue-motion-one'
import { useRouter, useRoute } from 'vue-router'

const { play, reset } = useAnimate(
  '.program-card',
  { y: -20, opacity: 1 },
  {
    delay: stagger(0.1),
    duration: 0.5,
    easing: [0.22, 0.03, 0.26, 1],
  },
)

onMounted(() => {
  play()
})

// press('.program-card', (element) => {
//   animate(element, { scale: 0.8 }, { type: 'spring', stiffness: 1000 })

//   return () => animate(element, { scale: 1 }, { type: 'spring', stiffness: 500 })
// })

const props = defineProps({ program: Object, isMain: Boolean })
const emit = defineEmits(['deleteProgram', 'editProgram'])

const isEditing = ref(false)
const editedName = ref(props.program.name)
const editedAttributes = ref(props.program.attributes.join(', '))
const router = useRouter()
const route = useRoute()

const openProgram = () => {
  if (props.isMain == true) {
    router.push(`/programs/${props.program.name}`)
  }
}

const editProgram = () => {
  if (props.isMain == true) {
    isEditing.value = true
  } else {
    router.push(`/edit-program/${props.program.id}`)
  }
}

const saveEdit = () => {
  emit('editProgram', {
    id: props.program.id,
    name: editedName.value,
    attributes: editedAttributes.value.split(',').map((attr) => attr.trim()),
  }),
    (isEditing.value = !isEditing.value)
}
</script>

<style scoped>
.program-card {
  opacity: 0;
  background: #d9a7f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  min-height: 80px;
}

.delete-btn,
.edit-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background: #3b003d;
}

.edit-modal {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.modal-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.save-btn {
  background: #3b003d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background: #ccc;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (min-width: 1480px) {
  .program-card {
    width: 40%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 11px;
  }
}
</style>
