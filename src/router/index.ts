import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/',
      name: 'empleados',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loggedIn = useAuthStore().token

  if (requiresAuth && !loggedIn) {
    next('/login')
  }
  next()
})

export default router
