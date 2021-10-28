import { authState } from 'rxfire/auth'
import { docData } from 'rxfire/firestore'
import { DocumentData, DocumentReference } from 'rxfire/firestore/interfaces'
import { map, switchMap } from 'rxjs'
import auth, { db } from '~/firebaseSetup'
import { AdminType } from '~/models/admin'

const apiAuthState$ = authState(auth).pipe(
  switchMap((user) =>
    docData(
      db
        .collection('admins')
        .doc(user?.uid) as unknown as DocumentReference<DocumentData>,
    ).pipe(
      map((docUser) => {
        if (!user || !docUser) {
          return null
        }

        const { email, name } = docUser

        return { uid: user.uid, email, name }
      }),
    ),
  ),
)

const apiChangeName = async (user: AdminType): Promise<boolean> => {
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
  apiAuthState$,
  apiChangeName,
}
