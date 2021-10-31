import { doc, updateDoc } from 'firebase/firestore'
import { authState } from 'rxfire/auth'
import { docData } from 'rxfire/firestore'
import { DocumentData } from 'rxfire/firestore/interfaces'
import { first, map, switchMap } from 'rxjs'
import auth, { db } from '~/firebaseSetup'
import { AdminType } from '~/models/admin'

const mapDocUser = (uid: string, docUser: DocumentData) => {
  if (!docUser) {
    return null
  }

  const { email, name } = docUser

  return { uid, email, name }
}

const apiAuthState$ = authState(auth).pipe(
  switchMap((user) =>
    docData(doc(db, `admins/${user?.uid}`)).pipe(
      map((docUser) => {
        if (!user) {
          return null
        }

        return mapDocUser(user.uid, docUser)
      }),
    ),
  ),
)

const apiChangeName$ = (user: AdminType) => {
  const adminDocRef = doc(db, `admins/${user.uid}`)
  updateDoc(adminDocRef, { name: user.name ?? '' })

  return docData(adminDocRef).pipe(
    first(),
    map((docUser) => mapDocUser(user.uid, docUser)),
  )
}

export default {
  apiAuthState$,
  apiChangeName$,
}
