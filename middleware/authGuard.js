import { logger } from '../utils/Logger.js'
import { AppState } from "../AppState.js";
import { AuthService } from '../services/AuthService.js';

// FIXME need custom redirect we do not have access to window. navigateTo can take in a raw url, so this should be the auth0 redirect

// return continues navigation
// abortNavigation to return error
// navigateTo for redirect

export function authLogin(domain, clientId, redirect) {
  return `https://${domain}/authorize?
response_type=code|token&
client_id=${clientId}&
connection=CONNECTION&
redirect_uri=${redirect}&
scope=openid%20profile%20email&
state=STATE`
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  let user = AppState.user
  let loggedIn = user.isAuthenticated
  // const { public: config } = useRuntimeConfig()
  if (process.client) {
    // logger.log(window.location.host)
    await AuthService.loginWithRedirect()
  }

  if (loggedIn) return;

  return navigateTo('/')
});


//FIXME this did not work cause the authservice loading never finished, this does hold the page from loading however
async function falseGuard() {
  const user = AppState.user
  let loggedIn = user.isAuthenticated

  if (!loggedIn && AuthService.loading) {
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        logger.log('waiting for auth', AuthService.loading, loggedIn)
        loggedIn = await falseGuard()
        resolve()
      }, 1000)
    })
  }

  if (loggedIn) return true
}
