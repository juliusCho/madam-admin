import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/app-check'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import endpoint from './endpoints.config'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp(endpoint.firebase)

const appCheck = firebase.appCheck()

appCheck.activate('6LeldDAcAAAAAFhaPmGhoKXSPrTNruGkTSocFD-8', true)

const auth = firebase.auth()

if (process.env.NODE_ENV !== 'test') {
  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export default auth
