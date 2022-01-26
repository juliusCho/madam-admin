import { deleteApp, FirebaseApp } from 'firebase/app'
import { initializeTestFirebase } from '~/__fixtures__'
import api from '.'

describe('API apiAdmin', () => {
  let app: FirebaseApp

  beforeEach(() => {
    const init = initializeTestFirebase()
    app = init.app
  })

  afterEach(() => {
    deleteApp(app).catch(() => undefined)
  })

  xit('apiAdminList$', (done) => {
    api.apiAdminList$().subscribe((data) => {
      expect('key' in data[0]).toBeTruthy()
      expect('name' in data[0]).toBeTruthy()
      expect('email' in data[0]).toBeTruthy()
      done()
    })
  })
})
