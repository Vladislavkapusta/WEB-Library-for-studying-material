<template>
  <div class="profile-container">
    <header>
      <button class="back-btn" @click="goBack">⬅ Назад</button>
      <button class="edit-btn" @click="goToEdit">Редактировать</button>
    </header>

    <div class="profile-info">
      <img :src="currentUser?.avatar" alt="Avatar" class="avatar" />
      <h2>{{ currentUser?.name }}</h2>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="details">
      <p><strong>Роль:</strong> {{ currentUser?.type }}</p>
      <p><strong>Логин:</strong> {{ currentUser?.login }}</p>
      <p><strong>Почта:</strong> {{ currentUser?.email }}</p>
    </div>

    <!-- Список пройденных программ (только для User) -->
    <div v-if="currentUser?.type === 'User'" class="completed-programs">
      <h3>Пройденные программы</h3>
      <div v-if="completedProgramsDetails.length">
        <div
          v-for="program in completedProgramsDetails"
          :key="program.id"
          class="program-item"
          @click="openProgram(program)"
        >
          <p>{{ program.title }} ({{ program.discipline }})</p>
        </div>
      </div>
      <p v-else>Нет пройденных программ</p>
    </div>

    <!-- <button
      v-if="currentUser?.type === 'User'"
      class="completed-btn"
      @click="goToCompleted"
    >
      Пройденные курсы
    </button> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/store/users'
import { useProgramsStore } from '@/store/programs'

const router = useRouter()
const usersStore = useUsersStore()
const programsStore = useProgramsStore()

const currentUser = computed(() => usersStore.currentUser)

// Получаем информацию о пройденных программах
const completedProgramsDetails = computed(() => {
  if (!currentUser.value || currentUser.value.type !== 'User') return []

  const programs = []
  currentUser.value.completedPrograms.forEach((programId) => {
    programsStore.disciplines.forEach((discipline) => {
      const program = discipline.programs.find((p) => p.id === programId)
      if (program) {
        programs.push({
          id: program.id,
          title: program.title,
          discipline: discipline.title,
        })
      }
    })
  })
  return programs
})

const openProgram = (program) => {
  router.push(`/program/${program.discipline}/${program.id}`)
}

const goBack = () => {
  router.go(-1)
}

const goToEdit = () => {
  router.push('/edit-profile')
}

const goToCompleted = () => {
  router.push('/completed-courses')
}

const logout = () => {
  usersStore.logoutUser()
  router.push('/login')
}
</script>
  
  <style scoped>
  .profile-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 10px;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .back-btn,
  .edit-btn {
    background: none;
    border: none;
    color: #1e3a8a;
    font-size: 16px;
    cursor: pointer;
  }
  
  .profile-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 20px;
    margin: 0 0 10px;
    color: #333;
  }
  
  .logout-btn {
    background: none;
    border: 1px solid #1e3a8a;
    color: #1e3a8a;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .logout-btn:hover {
    background: #f0f0f0;
  }
  
  .details {
    background: white;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .details p {
    margin: 5px 0;
    font-size: 14px;
    color: black;
  }
  
  .details strong {
    color: #333;
  }
  
  .completed-btn {
    width: 100%;
    padding: 10px;
    background: #1e3a8a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .completed-btn:hover {
    background: #1e40af;
  }
  .completed-programs {
  background: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.completed-programs h3 {
  font-size: 16px;
  margin: 0 0 10px;
  color: #1e40af;

}

.program-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
  color: #8a84df;
}

.program-item:hover {
  background: #f0f0f0;
}

.program-item:last-child {
  border-bottom: none;
}

.completed-btn {
  width: 100%;
  padding: 10px;
  background: #1e3a8a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.completed-btn:hover {
  background: #1e40af;
}
  </style>