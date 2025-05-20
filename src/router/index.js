import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import ProgramListPage from '../views/ProgramListPage.vue'
import RedactProgramView from '@/views/RedactProgramView.vue'
import AltHomeView from '@/views/AltHomeView.vue'
import ProgramReadView from '@/views/ProgramReadView.vue'
import RegistrationView from '@/views/RegistrationView.vue' // Новый компонент
import AuthorizationView from '@/views/AuthorizationView.vue' // Новый компонент
import ProfileView from '@/views/ProfileView.vue' // Новый компонент

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AltHomeView,
    },
    {
      path: '/notFound',
      name: 'Error',
      component: ErrorView,
    },
    {
      path: '/programs/:discipline',
      name: 'Programs',
      component: ProgramListPage,
    },
    {
      path: '/edit-program/:disciplineTitle/:id?',
      component: RedactProgramView,
      name: 'RedactProgram',
      props: true,
    },
    {
      path: '/program/:disciplineTitle/:programId',
      name: 'program-read',
      component: ProgramReadView,
      props: true,
    },
    {
      path: '/register',
      name: 'Registration',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'Authorization',
      component: AuthorizationView,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
    },
    // {
    //   path: '/edit-profile',
    //   name: 'EditProfile',
    //   component: () => import('@/views/EditProfileView.vue'), // Загружаем асинхронно (lazy loading)
    // },
    // {
    //   path: '/completed-courses',
    //   name: 'CompletedCourses',
    //   component: () => import('@/views/CompletedCoursesView.vue'), // Загружаем асинхронно (lazy loading)
    // },
  ],
})

export default router