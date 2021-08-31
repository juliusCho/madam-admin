import firebase from 'firebase'
import React from 'react'
import { RouterProps } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { apiLogin } from '../../api'
import { ButtonCircle } from '../../components/buttons/circle'
import { LabelMadam } from '../../components/labels/madam'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import auth from '../../firebaseSetup'
import adminGlobalStates from '../../recoil/admin'
import etcGlobalStates from '../../recoil/etc'
import customHooks from '../../utils/hooks'
import PageLoginStyle from './login.style'

export interface PageLoginProps {}

export default function PageLogin({ history }: PageLoginProps & RouterProps) {
  useTitle(ROUTER_TITLE.LOGIN)

  const isMounted = customHooks.useIsMounted()

  const setAdmin = Recoil.useSetRecoilState(adminGlobalStates.adminState)
  const setVerified = Recoil.useSetRecoilState(adminGlobalStates.verifiedState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)
  const [alert, setAlert] = Recoil.useRecoilState(etcGlobalStates.alertState)

  const [noFound, setNoFound] = React.useState(false)

  React.useEffect(() => {
    if (!isMounted()) return
    setNoFound(() => alert.type === 'error')
  }, [isMounted, alert.type])

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setAdmin(() => null)
        return
      }

      console.log('=====================================')
      console.log('uid: ', user.uid)
      console.log('email: ', user.email)
      console.log('name: ', user.displayName)

      firebase
        .database()
        .ref('admin')
        .orderByKey()
        .equalTo(user.uid)
        .once('value', async (admin) => {
          if (!admin.exists) {
            setAdmin(() => null)
            return
          }
          setLoading(() => true)

          const result = await apiLogin(admin.exportVal())
          if (!result) {
            setAdmin(() => null)
            return
          }
          const { loggedInAdmin, verified } = result
          setVerified(() => verified)

          if (verified) {
            setAdmin(() => loggedInAdmin)
          }
        })
    })
  }, [isMounted, auth, firebase])

  React.useEffect(() => {
    if (!isMounted()) return
    if (history.location.pathname === ROUTER_PATH.LOGIN) {
      setLoading(() => false)

      setAdmin(() => null)
    }
  }, [isMounted, history.location.pathname, ROUTER_PATH.LOGIN, auth])

  const signIn = async () => {
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

    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch((e) => {
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
    <>
      <div className={PageLoginStyle.container} style={{ marginTop: '-5rem' }}>
        <LabelMadam className="mb-10" style={{ fontSize: '5rem' }} />
        <ButtonCircle
          onClick={signIn}
          className="m-5 mb-10"
          borderWidth="border-2">
          Login
        </ButtonCircle>
        {noFound && (
          <span
            className={PageLoginStyle.error}
            data-testid="page.login.noAuthMsg">
            해당 정보와 일치하는 계정을 찾을 수 없습니다.
          </span>
        )}
      </div>
    </>
  )
}
