import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import Recoil from 'recoil'
import { ROUTER_PATH } from '~/constants/etc'
import { AdminType } from '~/models/admin'
import App from './app.component'

describe('app 테스트', () => {
  const testAdminState = Recoil.atom<AdminType | null>({
    key: 'testAdminState',
    default: null,
  })
  const testTokenState = Recoil.atom({
    key: 'testTokenState',
    default: '',
  })

  const testUser = { email: 'test', uid: 'test', name: 'test' }

  it('recoil state', () => {
    const initialSnapshot = Recoil.snapshot_UNSTABLE()

    expect(initialSnapshot.getLoadable(testAdminState).valueOrThrow()).toBe(
      null,
    )
    expect(initialSnapshot.getLoadable(testTokenState).valueOrThrow()).toBe('')

    const changedSnapshot = Recoil.snapshot_UNSTABLE(({ set }) => {
      set(testAdminState, testUser)
      set(testTokenState, 'ok')
    })

    expect(
      changedSnapshot.getLoadable(testAdminState).valueOrThrow(),
    ).toStrictEqual(testUser)
    expect(changedSnapshot.getLoadable(testTokenState).valueOrThrow()).not.toBe(
      '',
    )
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
        set(testTokenState, '')
      })

      setTimeout(() => {
        expect(history.location.pathname).toBe(ROUTER_PATH.LOGIN)
      }, 300)
    })
    it('logged in', () => {
      Recoil.snapshot_UNSTABLE(({ set }) => {
        set(testAdminState, testUser)
        set(testTokenState, 'ok')
      })

      setTimeout(() => {
        expect(history.location.pathname).toBe(ROUTER_PATH.DASHBOARD.APP_USE)
      }, 300)
    })
  })
})
