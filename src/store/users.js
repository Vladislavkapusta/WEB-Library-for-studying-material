import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUsersStore = defineStore('users', () => {
  // Загрузка данных из localStorage или инициализация начальными данными
  const loadUsers = () => {
    const savedData = localStorage.getItem('users')
    return savedData ? JSON.parse(savedData) : [
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
    ]
  }

   const users = ref(loadUsers())
  const currentUser = ref(null)

  // Сохранение данных в localStorage при изменении
  watch(users, (newValue) => {
    localStorage.setItem('users', JSON.stringify(newValue))
  }, { deep: true })

  watch(currentUser, (newValue) => {
    if (newValue) {
      localStorage.setItem('currentUser', JSON.stringify(newValue))
    } else {
      localStorage.removeItem('currentUser')
    }
  })

  // Регистрация нового пользователя
  const registerUser = (userData) => {
    const newUser = {
      id: Date.now(),
      type: 'User',
      login: userData.login,
      password: userData.password,
      name: userData.login,
      email: userData.email,
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash',
      completedPrograms: [],
    }
    users.value.push(newUser)
    currentUser.value = newUser
  }

  // Авторизация пользователя
  const loginUser = (login, password) => {
    const user = users.value.find((u) => u.login === login && u.password === password)
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

  // Добавление программы в список пройденных
  const addCompletedProgram = (programId) => {
    if (currentUser.value && currentUser.value.type === 'User') {
      if (!currentUser.value.completedPrograms.includes(programId)) {
        currentUser.value.completedPrograms.push(programId)
        const userIndex = users.value.findIndex((u) => u.id === currentUser.value.id)
        if (userIndex !== -1) {
          users.value[userIndex] = { ...currentUser.value }
        }
      }
    }
  }

  // Загрузка текущего пользователя при инициализации
  currentUser.value = JSON.parse(localStorage.getItem('currentUser')) || null

  return {
    users,
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    addCompletedProgram,
  }
})