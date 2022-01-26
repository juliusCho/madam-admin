import { Auth, signInAnonymously } from '@firebase/auth'
import { deleteApp, FirebaseApp } from 'firebase/app'
import { doc, Firestore } from 'firebase/firestore'
import { authState } from 'rxfire/auth'
import { docData } from 'rxfire/firestore'
import { map, skip, take } from 'rxjs'
import endpoints from '~/endpoints.config'
import { initializeTestFirebase } from '~/__fixtures__'
import api from '.'

describe('API apiSession', () => {
  let app: FirebaseApp
  let auth: Auth
  let db: Firestore

  beforeEach(() => {
    const init = initializeTestFirebase()
    app = init.app
    auth = init.auth
    db = init.db
  })

  afterEach(() => {
    deleteApp(app).catch(() => undefined)
  })

  xit('apiAuthState$', (done) => {
    api.apiAuthState$().subscribe((data) => {
      expect(data?.key).toBe(endpoints.test.key)
      done()
    })
  })

  xit('apiChangeName$', (done) => {
    const { key, name, email } = endpoints.test

    api
      .apiChangeName$({
        key,
        name,
        email,
      })
      .subscribe({
        next: (data) => {
          expect(data?.name).toBe(name)
        },
        complete: () => done(),
      })
  })

  it('should initially be unauthenticated', (done) => {
    authState(auth)
      .pipe(take(1))
      .subscribe((state) => {
        expect(state).toBeNull()
      })
      .add(done)
  })

  xit('should trigger an authenticated state', (done) => {
    authState(auth)
      .pipe(skip(1), take(1))
      .subscribe((state) => {
        expect(state).not.toBeNull()
        expect(state?.isAnonymous).toEqual(true)
      })
      .add(done)

    signInAnonymously(auth)
  })

  xit('get admin', (done) => {
    docData(doc(db, `admins/${endpoints.test.key}`))
      .pipe(
        map((docUser) => {
          if (!docUser) return null

          const { email, name } = docUser
          return { key: endpoints.test.key, email, name }
        }),
      )
      .subscribe((user) => {
        expect(user).not.toBeNull()
        expect(user?.email).toBe(endpoints.test.email)
        done()
      })
  })
})
