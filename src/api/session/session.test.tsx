import endpoints from '~/endpoints.config'
import auth, { db } from '~/firebaseSetup'
import api from '.'

describe('API apiSession', () => {
  it('apiLogin', async () => {
    if (auth?.currentUser) {
      const result = await api.apiLogin(auth.currentUser)
      expect(result?.uid).toBe(endpoints.test.uid)
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
