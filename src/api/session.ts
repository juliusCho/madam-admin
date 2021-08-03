import firebase from 'firebase/app'
import { AdminType } from '../types'
// import axios from 'axios'

export const apiLogin = async (
  firebaseUser: firebase.User,
): Promise<AdminType | null> => {
  const { email, displayName } = firebaseUser
  if (!email) return null

  const key = await firebaseUser.getIdToken()

  if (email !== process.env.REACT_APP_TEST_EMAIL) {
    return null
  }

  return {
    email,
    key,
    name: displayName || email,
  }
}
