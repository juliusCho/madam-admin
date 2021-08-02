import firebase from 'firebase/app'
import React from 'react'
import Recoil from 'recoil'
import { ButtonCircle } from '../../components/buttons/circle'
import { LabelMadam } from '../../components/labels/madam'
import auth from '../../firebaseSetup'
import userGlobalStates from '../../recoil/user'
import customHooks from '../../utils/hooks'
import PageLoginStyle from './login.style'

export interface PageLoginProps {}

export default function PageLogin({}: PageLoginProps) {
  const isMounted = customHooks.useIsMounted()

  const setUser = Recoil.useSetRecoilState(userGlobalStates.userState)

  React.useEffect(() => {
    if (!isMounted()) return
    auth.signOut()

    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser === null) {
        setUser(null)
        return
      }

      const { email, displayName } = firebaseUser

      if (!email) return

      firebaseUser.getIdToken().then((key) => {
        setUser({
          email,
          key,
          name: displayName || email,
        })
      })
    })
  }, [])

  const signIn = async () => {
    await auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch((e) => {
        console.log(e.message)
      })
  }

  return (
    <div className={PageLoginStyle.container} style={{ marginTop: '-5rem' }}>
      <LabelMadam className="mb-10" style={{ fontSize: '5rem' }} />
      <ButtonCircle onClick={signIn} className="m-5 mb-10" borderWidth={2}>
        Login
      </ButtonCircle>
    </div>
  )
}
