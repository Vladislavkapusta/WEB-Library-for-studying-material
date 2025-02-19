import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import ProgramListPage from '../views/ProgramListPage.vue'
import RedactProgramView from '@/views/RedactProgramView.vue'
import AltHomeView from '@/views/AltHomeView.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
