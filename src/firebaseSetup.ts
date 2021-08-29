import firebase from 'firebase/app'
import 'firebase/auth'
import endpoint from './endpoints.config'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp(endpoint.firebase)

const auth = firebase.auth()

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default auth
