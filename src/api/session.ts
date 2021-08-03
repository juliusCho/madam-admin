import firebase from 'firebase/app'
import { AdminType } from '../types'
import helpers from '../utils/helpers'
// import axios from 'axios'

export const apiLogin = async (
  firebaseUser: firebase.auth.UserCredential,
): Promise<AdminType | null> => {
  // const { profile, credential } = firebaseUser
  // @ts-ignore
  const { id, email, name } = firebaseUser.additionalUserInfo?.profile

  if (!id || !email) return null

  const key = helpers.encode(id)
  console.log('=============로그인 Attempt 유저 정보============')
  console.log('email: ', email)
  console.log('key: ', key)
  console.log('name: ', name || email)

  if (email !== process.env.REACT_APP_TEST_EMAIL) {
    return null
  }

  return {
    email,
    key,
    name: name || email,
  }
}
