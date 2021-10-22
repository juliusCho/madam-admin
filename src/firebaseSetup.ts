import 'firebase/compat/analytics'
import firebase from 'firebase/compat/app'
import 'firebase/compat/app-check'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import endpoint from './endpoints.config'
import {
  firestoreTestAuthenticate,
  initializeFirestoreTestEnv,
} from './__fixtures__'

let auth: any
let firestore: any

if (process.env.NODE_ENV === 'test') {
  const testEnv = initializeFirestoreTestEnv()

  testEnv.then((res) => {
    firestore = firestoreTestAuthenticate(res).firestore()
    auth = (firestore as firebase.firestore.Firestore).app.auth()
  })
} else {
  firebase.initializeApp(endpoint.firebase)

  firestore = firebase.firestore()

  const appCheck = firebase.appCheck()

  appCheck.activate(endpoint.firebase.siteKey, true)

  auth = firebase.auth()

  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export const db = firestore as firebase.firestore.Firestore

export default auth as firebase.auth.Auth
