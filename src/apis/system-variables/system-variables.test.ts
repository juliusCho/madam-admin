import { deleteApp, FirebaseApp } from 'firebase/app'
import { startAfter } from 'firebase/firestore'
import moment from 'moment'
import { initializeTestFirebase } from '~/__fixtures__'
import api from '.'

describe('API SystemVariables', () => {
  let app: FirebaseApp

  beforeEach(() => {
    const init = initializeTestFirebase()
    app = init.app
  })

  afterEach(() => {
    deleteApp(app).catch(() => undefined)
  })

  describe('apiGetProfileExtraItems$', () => {
    xit('전체 조회', (done) => {
      api.apiGetProfileExtraItems$().subscribe((result) => {
        expect(result).not.toBeNull()

        done()
      })
    })

    xit('limit to 1', (done) => {
      api
        .apiGetProfileExtraItems$({
          limit: 1,
          offset: startAfter(moment('9999-12-31').toDate()),
          sort: {
            column: 'modifiedAt',
            type: 'desc',
          },
        })
        .subscribe((result) => {
          expect(result.length).toBe(1)

          done()
        })
    })
  })
})
