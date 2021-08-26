import firebase from 'firebase/app'
import { getFirebaseConfig } from './configs'

export default !firebase.apps.length ? firebase.initializeApp(getFirebaseConfig()) : firebase.app()
