import { getProjectId } from '~/firebase/configs'
import AbstracService from '~/utils/AbstractService'

class AuthService extends AbstracService {
  constructor (req) {
    super()
    this.baseUrl = `https://password-reset.${getProjectId()}.gsuito.com/password-reset`
  }

  sendPasswordResetEmail (email) {
    return new Promise((resolve, reject) => {
      this
        .request()
        .post('', { email })
        .then((response) => {
          resolve(response.data)
        }).catch((err) => {
          console.error('Can\'t send', err)
          reject(err)
        })
    })
  }
}
export const authService = new AuthService()
