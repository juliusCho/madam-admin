import firebase from 'firebase/app'
import React from 'react'
import { RouterProps } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { apiLogin } from '../../api'
import { ButtonCircle } from '../../components/buttons/circle'
import { LabelMadam } from '../../components/labels/madam'
import { Alert } from '../../components/modals/alert'
import auth from '../../firebaseSetup'
import etcGlobalStates from '../../recoil/etc'
import userGlobalStates from '../../recoil/user'
import { ROUTER_PATH, ROUTER_TITLE } from '../../types'
import customHooks from '../../utils/hooks'
import PageLoginStyle from './login.style'

export interface PageLoginProps {}

export default function PageLogin({ history }: PageLoginProps & RouterProps) {
  useTitle(ROUTER_TITLE.LOGIN)

  const isMounted = customHooks.useIsMounted()

  const setUser = Recoil.useSetRecoilState(userGlobalStates.userState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)

  const [showAlert, setShowAlert] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [alertType, setAlertType] = React.useState<'info' | 'error'>('info')

  // const setUserFromFetching = React.useCallback(async (firebaseUser) => {
  //   const fetched = await apiLogin(firebaseUser)

  // }, [])

  React.useEffect(() => {
    if (!isMounted()) return
    if (history.location.pathname === ROUTER_PATH.LOGIN) {
      setAlertType(() => 'info')

      setLoading(() => false)

      setUser(() => null)
    }
  }, [isMounted, history.location.pathname, ROUTER_PATH.LOGIN, auth])

  // React.useEffect(() => {
  //   if (!isMounted()) return

  //   auth.onAuthStateChanged((firebaseUser) => {
  //     if (firebaseUser === null) {
  //       setUser(null)
  //       return
  //     }

  //     setLoading(true)
  //     setUserFromFetching(firebaseUser)
  //   })
  // }, [])

  const signIn = async () => {
    setAlertType('info')

    const result = await auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => res)
      .catch((e) => {
        setAlertType('error')
        setAlertMsg(e.message)
        setShowAlert(true)
        return null
      })

    if (!result) {
      setUser(null)
      return
    }

    setLoading(true)

    const fetched = await apiLogin(result)

    if (!fetched) {
      setShowAlert(false)
      setAlertType('error')
    } else {
      setAlertMsg('로그인 되었습니다.')
      setShowAlert(true)
    }

    setUser(fetched)

    setLoading(false)
  }

  const onHide = () => {
    setShowAlert(false)
  }

  return (
    <>
      <Alert
        show={showAlert}
        msg={alertMsg}
        type={alertType}
        showTime={1500}
        onHide={onHide}
      />
      <div className={PageLoginStyle.container} style={{ marginTop: '-5rem' }}>
        <LabelMadam className="mb-10" style={{ fontSize: '5rem' }} />
        <ButtonCircle onClick={signIn} className="m-5 mb-10" borderWidth={2}>
          Login
        </ButtonCircle>
        {alertType === 'error' && (
          <span className={PageLoginStyle.error}>
            해당 정보와 일치하는 계정을 찾을 수 없습니다.
          </span>
        )}
      </div>
    </>
  )
}
