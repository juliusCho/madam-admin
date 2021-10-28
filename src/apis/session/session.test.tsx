import { of } from 'rxjs'
import endpoints from '~/endpoints.config'
import auth, { db } from '~/firebaseSetup'
import api from '.'

describe('API apiSession', () => {
  it('apiAuthState$', async (done) => {
    if (auth?.currentUser) {
      of(api.apiAuthState$).subscribe((data) => {
        expect(data).toBe(endpoints.test.uid)
        done()
      })
    }
  })

  it('apiChangeName', async () => {
    if (db) {
      const { uid, name, email } = endpoints.test
      const result = await api.apiChangeName({
        uid,
        name,
        email,
      })
      expect(result).toBeTruthy()
    }
  })
})
