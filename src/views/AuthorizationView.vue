<template>
    <div class="auth-container">
      <h2>Авторизация</h2>
      <div class="input-group">
        <label>Логин</label>
        <input v-model="login" placeholder="Введите логин" />
      </div>
      <div class="input-group">
        <label>Пароль</label>
        <input v-model="password" type="password" placeholder="Введите пароль" />
      </div>
      <button class="auth-btn" @click="loginUser">Авторизоваться</button>
      <button class="link-btn" @click="goToRegister">Зарегистрироваться</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUsersStore } from '@/store/users'
  
  const router = useRouter()
  const usersStore = useUsersStore()
  
  const login = ref('')
  const password = ref('')
  
  const loginUser = () => {
    if (login.value && password.value) {
      const success = usersStore.loginUser(login.value, password.value)
      if (success) {
        router.push('/') // Перенаправляем в профиль после авторизации
      } else {
        alert('Неверный логин или пароль')
      }
    } else {
      alert('Пожалуйста, заполните все поля')
    }
  }
  
  const goToRegister = () => {
    router.push('/register')
  }
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
  }
  
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #666;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .auth-btn {
    width: 100%;
    padding: 10px;
    background: #1e3a8a;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .auth-btn:hover {
    background: #1e40af;
  }
  
  .link-btn {
    width: 100%;
    padding: 10px;
    background: none;
    border: 1px solid #1e3a8a;
    color: #1e3a8a;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .link-btn:hover {
    background: #f0f0f0;
  }
  </style>