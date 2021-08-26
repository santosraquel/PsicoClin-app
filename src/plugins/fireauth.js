import Cookies from 'js-cookie'
import { auth } from '~/firebase/fireauth'
import { usersService } from '~/app/users/UsersService'

let interval = null

function updateToken (store) {
  auth.currentUser.getIdToken(true)
    .then((token) => {
      Cookies.set('access_token', token)
    })
    .catch(() => {
      store.dispatch('account/setApiFall')
    })
}

function setUpdate (store) {
  updateToken(store)
  interval = setInterval(() => updateToken(store), 50 * 60 * 1000)
}

export default ({ store, route, redirect }) => {
  auth.onAuthStateChanged(async (user) => {
    try {
      if (!user) { throw new Error('No current user.') }
      await getProfile(store, user)
      // Auto update user token
      setUpdate()
      window.addEventListener('blur', () => {
        clearInterval(interval)
        interval = null
      })
      window.addEventListener('focus', () => {
        if (!interval) {
          setUpdate(store)
        }
      })
      updateToken(store)
    } catch (e) {
      console.error(e)
      clearInterval(interval)
      store.commit('account/forceLogin', true)
      store.commit('account/setUser', null)
    }
  })
}

export async function getProfile (store, user) {
  const token = await auth.currentUser.getIdToken(true)
  Cookies.set('access_token', token)

  return usersService.get(auth.currentUser.email)
    .then((storedUser) => {
      storedUser.email = user.email
      store.commit('account/setUser', storedUser)
      auth.user = storedUser // Set Stored user in auth
    })
}
