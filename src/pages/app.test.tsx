import { render } from '@testing-library/react'
import { deleteApp, FirebaseApp } from 'firebase/app'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import Recoil from 'recoil'
import { ROUTER_PATH } from '~/constants/etc'
import { AdminType } from '~/models/admin'
import { initializeTestFirebase } from '~/__fixtures__'
import App from './app.component'

describe('app 테스트', () => {
  let app: FirebaseApp

  beforeEach(() => {
    const init = initializeTestFirebase()
    app = init.app
  })

  afterEach(() => {
    deleteApp(app).catch(() => undefined)
  })

  const testAdminState = Recoil.atom<AdminType | null>({
    key: 'testAdminState',
    default: null,
  })
  const testVerifiedState = Recoil.atom({
    key: 'testVerifiedState',
    default: false,
  })

  const testUser = { email: 'test', uid: 'test', name: 'test' }

  it('recoil state', () => {
    const initialSnapshot = Recoil.snapshot_UNSTABLE()

    expect(initialSnapshot.getLoadable(testAdminState).valueOrThrow()).toBe(
      null,
    )
    expect(
      initialSnapshot.getLoadable(testVerifiedState).valueOrThrow(),
    ).toBeFalsy()

    const changedSnapshot = Recoil.snapshot_UNSTABLE(({ set }) => {
      set(testAdminState, testUser)
      set(testVerifiedState, true)
    })

    expect(
      changedSnapshot.getLoadable(testAdminState).valueOrThrow(),
    ).toStrictEqual(testUser)
    expect(
      changedSnapshot.getLoadable(testVerifiedState).valueOrThrow(),
    ).toBeTruthy()
  })

  describe('init Router', () => {
    const history = createMemoryHistory()

    render(
      <Recoil.RecoilRoot>
        <Router history={history}>
          <App />
        </Router>
      </Recoil.RecoilRoot>,
    )

    it('not logged in', () => {
      Recoil.snapshot_UNSTABLE(({ set }) => {
        set(testAdminState, null)
        set(testVerifiedState, false)
      })

      setTimeout(() => {
        expect(history.location.pathname).toBe(ROUTER_PATH.LOGIN)
      }, 300)
    })
    it('logged in', () => {
      Recoil.snapshot_UNSTABLE(({ set }) => {
        set(testAdminState, testUser)
        set(testVerifiedState, true)
      })

      setTimeout(() => {
        expect(history.location.pathname).toBe(ROUTER_PATH.DASHBOARD.APP_USE)
      }, 300)
    })
  })
})
