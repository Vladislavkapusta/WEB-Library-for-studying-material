import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    {
      id: 1,
      type: 'Admin',
      login: 'admin',
      password: 'admin123',
      name: 'AdminUser',
      email: 'admin@example.com',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash', // Placeholder для аватарки
    },
    {
      id: 2,
      type: 'Teacher',
      login: 'teacher',
      password: 'teacher123',
      name: 'TeacherUser',
      email: 'teacher@example.com',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash',
    },
    {
      id: 3,
      type: 'User',
      login: 'testuser',
      password: 'testuser123',
      name: 'TestUser',
      email: 'testuser@example.com',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash',
      completedPrograms: [], // Список пройденных программ для User
    },
  ])

  const currentUser = ref(null)

  // Регистрация нового пользователя
  const registerUser = (userData) => {
    const newUser = {
      id: Date.now(),
      type: 'User', // Новые пользователи по умолчанию — User
      login: userData.login,
      password: userData.password,
      name: userData.login, // Имя по умолчанию совпадает с логином
      email: userData.email,
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash', // Placeholder для аватарки
      completedPrograms: [], // Пустой список для новых пользователей
    }
    users.value.push(newUser)
    currentUser.value = newUser
  }

  // Авторизация пользователя
  const loginUser = (login, password) => {
    const user = users.value.find(
      (u) => u.login === login && u.password === password
    )
    if (user) {
      currentUser.value = user
      return true
    }
    return false
  }

  // Выход из аккаунта
  const logoutUser = () => {
    currentUser.value = null
  }

  // Добавление программы в пройденные (для User)
  const addCompletedProgram = (programId) => {
    if (currentUser.value && currentUser.value.type === 'User') {
      if (!currentUser.value.completedPrograms.includes(programId)) {
        currentUser.value.completedPrograms.push(programId)
        // Обновляем пользователя в общем списке
        const userIndex = users.value.findIndex((u) => u.id === currentUser.value.id)
        if (userIndex !== -1) {
          users.value[userIndex] = { ...currentUser.value }
        }
      }
    }
  }

  return {
    users,
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    addCompletedProgram,
  }
})