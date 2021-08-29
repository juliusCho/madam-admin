import firebase from 'firebase'
import auth from '../firebaseSetup'
import { AdminType } from '../types'

export const verifyAndGetToken = async (token: string, uid: string) => {
  return true
}

export const apiLogin = async (
  firebaseAdmin: Record<string, string> | null,
): Promise<{ loggedInAdmin: AdminType; verified: boolean } | null> => {
  if (!firebaseAdmin) return null

  const uid = Object.keys(firebaseAdmin)[0]
  // @ts-ignore
  const { email, name } = firebaseAdmin[uid]

  const idToken = await auth.currentUser
    ?.getIdToken(true)
    .then((res) => res)
    .catch((e) => {
      console.error('firebase getIdToken', e.message)
      return null
    })

  if (!idToken) return null

  const verified = await verifyAndGetToken(idToken, uid)

  return {
    loggedInAdmin: {
      uid,
      email,
      name,
    },
    verified,
  }
}

export const apiChangeName = async (user: AdminType): Promise<boolean> => {
  return firebase
    .database()
    .ref(`admin/${user.uid}`)
    .update({
      name: user.name,
    })
    .then(() => true)
    .catch((e) => {
      console.error('firebase changeName', e.message)
      return false
    })
}

export const apiLogout = () => {}
