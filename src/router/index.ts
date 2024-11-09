import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
      meta: { requiresNoAuth: true },
    },
  ],
})

// auth guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresNoAuth = to.matched.some((record) => record.meta.requiresNoAuth)
  const token = sessionStorage.getItem('authToken')

  if (requiresAuth && !token) {
    next('/signin')
  } else if (requiresNoAuth && token) {
    next('/')
  } else {
    next()
  }
})

export default router
