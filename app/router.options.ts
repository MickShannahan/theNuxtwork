import { authGuard } from '@bcwdev/auth0provider-client'
import type { RouterConfig } from '@nuxt/schema'
import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService.js'

function loadPage(page) {
  return () => import(`~/pages/${page}.vue`)
}


// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: loadPage('home')
    },
    {
      name: 'about',
      path: '/about',
      component: loadPage('About'),
      meta: {
        middleware: 'auth-guard'
      }
    },
    {
      name: 'login',
      path: '/login',
      component: loadPage('LoginPage')
    },
    {
      name: 'profile',
      path: '/profiles/:profileId',
      component: loadPage('profile')
    },
    {
      name: 'account',
      path: '/account',
      component: loadPage('Account'),
      meta: {
        middleware: 'auth-guard'
      }
      // beforeEnter: falseGuard
    }
  ],
}
