import firebase from 'firebase/compat'
import { db } from '~/firebaseSetup'
import { AdminType } from '~/models/admin'

export const apiLogin = async (
  firebaseAdmin: firebase.User,
): Promise<AdminType | null> => {
  if (!firebaseAdmin) return null

  const { uid } = firebaseAdmin

  const admin = await db
    .collection('admins')
    .doc(uid)
    .get()
    .catch(() => null)
  if (!admin?.exists) {
    return null
  }

  const data = admin.data()
  if (!data) {
    return null
  }

  const { email, name } = data

  return {
    uid,
    email,
    name,
  }
}

export const apiChangeName = async (user: AdminType): Promise<boolean> => {
  return db
    .collection('admins')
    .doc(user.uid)
    .update({
      name: user.name ?? '',
    })
    .then(() => true)
    .catch(() => false)
}

export default {
  apiLogin,
  apiChangeName,
}
