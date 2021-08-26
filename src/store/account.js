import Cookies from 'js-cookie'
import { set } from '@/utils/vuex'
import { auth, GoogleAuthProvider } from '~/firebase/fireauth'

import { usersService } from '~/app/users/UsersService'

export const state = () => ({
  user: null,
  apiFall: 0,
  forceLogin: false,
})

export const mutations = {
  setUser: set('user'),
  setUid: set('user.uid'),
  apiFall: set('apiFall'),
  forceLogin: set('forceLogin'),
}

export const getters = {
  isAuthenticated (store) {
    return !!store.user && !!store.user._id
  },
  isTester (store) {
    return store.user.role !== 'Admin' &&
    store.user.role !== 'Editor'
  },
  userRole (store) {
    return store.user.role
  },
}

export const actions = {
  signIn (_, payload) {
    return auth.signInWithEmailAndPassword(payload.email, payload.password)
  },
  signInGoogle () {
    return auth.signInWithPopup(GoogleAuthProvider)
      .then((user) => {
        return usersService.get(auth.currentUser.email)
      })
  },
  signOut ({ commit }) {
    return new Promise((resolve) => {
      Cookies.remove('access_token')
      resolve(auth.signOut())
    })
  },

  addApiFall (state) {
    state.apiFall++
  },

  resetApiFall (state) {
    state.apiFall = 0
  },
}
