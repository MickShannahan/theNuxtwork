import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
// import { audience, clientId, domain } from '../env'
// import { router } from '../router'
import { accountService } from './AccountService'
import { api } from './AxiosService'

// FIXME get values from app.config or runtime config
export const audience = 'https://codeworksclassroom.com'
export const clientId = 'pOXw2OGv1LsYi7LEBmDF04RLkXQvldml'
export const domain = 'codeworksclassroom.auth0.com'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  useRefreshTokens: true,
  onRedirectCallback: appState => {
    // FIXME need router instance as plugin?
    // router.push(
    //   appState && appState.targetUrl
    //     ? appState.targetUrl
    //     : window.location.pathname
    // )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function () {
  api.defaults.headers.authorization = AuthService.bearer
  api.interceptors.request.use(refreshAuthToken)
  AppState.user = AuthService.user
  await accountService.getAccount()
  // NOTE if there is something you want to do once the user is authenticated, place that here
})

async function refreshAuthToken(config) {
  if (!AuthService.isAuthenticated) { return config }
  const expires = AuthService.identity.exp * 1000
  const expired = expires < Date.now()
  const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
  if (expired) {
    await AuthService.loginWithPopup()
  } else if (needsRefresh) {
    await AuthService.getTokenSilently()
    api.defaults.headers.authorization = AuthService.bearer
  }
  return config
}
