import { Subject } from 'rxjs'
import { AdminType } from '~/models/admin'

const subject$ = new Subject<AdminType | null>()

// export const adminName$ = subject$.pipe(
//   switchMap((admin) => {
//     if (!admin?.name) return of('')

//     const adminDocRef = db.collection('admins').doc(admin.uid)
//     setDoc(adminDocRef, {name: user.name ?? ''})

//     return docData(adminDocRef, {idField: 'uid'}).pipe(
//       map
//     )
//   })
// )
