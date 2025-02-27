import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import ProgramListPage from '../views/ProgramListPage.vue'
import RedactProgramView from '@/views/RedactProgramView.vue'
import AltHomeView from '@/views/AltHomeView.vue'
import ProgramReadView from '@/views/ProgramReadView.vue'

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
      path: '/edit-program/:id?',
      component: RedactProgramView,
      name: 'RedactProgram',
      props: true,
    },
    {
      path: '/program/:disciplineTitle/:programId',
      name: 'program-read',
      component: ProgramReadView,
      props: true, // Позволяет передавать параметры в компонент
    },
  ],
})

export default router
