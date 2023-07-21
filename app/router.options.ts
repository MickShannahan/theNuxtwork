import { authGuard } from '@bcwdev/auth0provider-client'
import type { RouterConfig } from '@nuxt/schema'
import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService'

function loadPage(page) {
  return () => import(`~/pages/${page}.vue`)
}

// FIXME need router guard and settled
function falseGuard() {
  let user = AppState.user
  if (!user.isAuthenticated) {

    const router = useRouter()
    router.push('/')
  }
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
      name: 'profile',
      path: '/profiles/:profileId',
      component: loadPage('profile')
    },
    {
      name: 'account',
      path: '/account',
      component: loadPage('Account'),
      beforeEnter: falseGuard
    }
  ],
}
