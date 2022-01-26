import { collection } from 'firebase/firestore'
import { collection as rxCollection } from 'rxfire/firestore'
import { map } from 'rxjs'
import { db } from '~/firebaseSetup'
import { AdminType } from '~/models/admin'

const apiAdminList$ = () =>
  rxCollection(collection(db, 'admins')).pipe(
    map((admins) =>
      admins.map(
        (admin) =>
          ({
            key: admin.id,
            ...admin.data(),
          } as AdminType),
      ),
    ),
  )

export default {
  apiAdminList$,
}
