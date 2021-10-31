import endpoints from '~/endpoints.config'
import auth, { db } from '~/firebaseSetup'
import api from '.'

describe('API apiSession', () => {
  xit('apiAuthState$', (done) => {
    if (auth?.currentUser) {
      api.apiAuthState$.subscribe((data) => {
        expect(data).toBe(endpoints.test.uid)
        done()
      })
    }
  })

  xit('apiChangeName$', (done) => {
    if (db) {
      const { uid, name, email } = endpoints.test

      api
        .apiChangeName$({
          uid,
          name,
          email,
        })
        .subscribe({
          next: (data) => {
            expect(data?.name).toBe(name)
          },
          complete: () => done(),
        })
    }
  })
})
