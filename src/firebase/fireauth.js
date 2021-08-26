import firebase from 'firebase/app'
import firebaseApp from './fireinit'
import 'firebase/auth'

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
GoogleAuthProvider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = firebaseApp.auth()
