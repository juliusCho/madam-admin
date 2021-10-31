import 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import 'firebase/app-check'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import 'firebase/auth'
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import 'firebase/storage'
import endpoint from './endpoints.config'

const app = initializeApp(endpoint.firebase)

const firestore = getFirestore(app)

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(endpoint.firebase.siteKey),
  isTokenAutoRefreshEnabled: true,
})

const auth = getAuth(app)

setPersistence(auth, browserSessionPersistence)

export const db = firestore

export default auth
