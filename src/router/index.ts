import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import authenticateUser from './route-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const projectName = import.meta.env.VITE_PROJECT_NAME as string

// global route authentication
router.beforeEach((to, from, next) => {
  const title = (to.meta && to.meta.title) ? to.meta.title : ''
  
  // update page title
  document.title = title ? projectName + ' | ' + title : projectName

  // authenticate user
  authenticateUser(to, from, next)
})

export default router
