import firebase from 'firebase/app'
import { AdminType } from '../types'
import helpers from '../utils/helpers'

export const apiLogin = async (
  firebaseUser: firebase.auth.UserCredential,
): Promise<AdminType | null> => {
  // @ts-ignore
  const { id, email, name } = firebaseUser.additionalUserInfo?.profile

  if (!id || !email) return null

  const uid = helpers.encode(id)
  console.log('=============로그인 Attempt 유저 정보============')
  console.log('email: ', email)
  console.log('uid: ', uid)
  console.log('name: ', name || email)

  return {
    email,
    uid,
    name: name || email,
  }
}

export const apiChangeName = async (user: AdminType) => {
  return { ...user }
}
