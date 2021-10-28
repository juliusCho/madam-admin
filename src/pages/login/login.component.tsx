import firebase from 'firebase/compat'
import React from 'react'
import { RouterProps } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { apiSession } from '~/apis'
import { ButtonCircle } from '~/components/buttons/circle'
import { LabelMadam } from '~/components/labels/madam'
import { ROUTER_PATH, ROUTER_TITLE } from '~/constants/etc'
import auth from '~/firebaseSetup'
import adminGlobalStates from '~/states/admin'
import etcGlobalStates from '~/states/etc'
import customHooks from '~/utils/hooks'
import PageLoginStyle from './login.style'

export interface PageLoginProps {}

export default function PageLogin({ history }: PageLoginProps & RouterProps) {
  useTitle(ROUTER_TITLE.LOGIN)

  const isMounted = customHooks.useIsMounted()

  const setAdmin = Recoil.useSetRecoilState(adminGlobalStates.adminState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)
  const [alert, setAlert] = Recoil.useRecoilState(etcGlobalStates.alertState)

  const [noFound, setNoFound] = React.useState(false)

  React.useEffect(() => {
    if (!isMounted()) return

    setNoFound(() => alert.type === 'error')
  }, [isMounted, alert.type])

  React.useLayoutEffect(() => {
    const subscription = apiSession.apiAuthState$.subscribe((user) => {
      setAdmin(() => user)

      setAlert((old) => ({
        ...old,
        show: true,
        type: user ? 'info' : 'warning',
        msg: user ? '로그인 되었습니다.' : '존재하지 않는 관리자 입니다.',
        time: 1500,
      }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  React.useEffect(() => {
    if (!isMounted()) return
    if (history.location.pathname === ROUTER_PATH.LOGIN) {
      setLoading(() => false)

      setAdmin(() => null)
    }
  }, [isMounted, history.location.pathname, ROUTER_PATH.LOGIN, auth])

  const signIn = () => {
    if (window.navigator.userAgent.includes('KAKAOTALK')) {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg: '카카오톡 내에서는 구글 로그인이 불가능합니다.',
        time: 1500,
      }))
      return
    }

    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch((e) => {
        if (!e.code.includes('cancelled-popup-request')) {
          setAlert((old) => ({
            ...old,
            show: true,
            type: 'error',
            msg: e.message,
            time: 1500,
          }))
        }
      })
  }

  return (
    <div
      className={`fade-in ${PageLoginStyle.container}`}
      style={{ marginTop: '-5rem', height: 'calc(100vh + 5rem)' }}>
      <LabelMadam className="mb-10" style={{ fontSize: '5rem' }} />
      <ButtonCircle
        onClick={signIn}
        className="m-5 mb-10"
        borderWidth="border-2">
        Login
      </ButtonCircle>
      {noFound && (
        <span
          className={`bottom-up ${PageLoginStyle.error}`}
          data-testid="page.login.noAuthMsg">
          해당 정보와 일치하는 계정을 찾을 수 없습니다.
        </span>
      )}
    </div>
  )
}
