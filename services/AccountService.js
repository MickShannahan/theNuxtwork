import { logger } from '../utils/Logger.js'
import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(account) {
    const res = await api.put('account', account)
    AppState.account = res.data
  }
}

export const accountService = new AccountService()
