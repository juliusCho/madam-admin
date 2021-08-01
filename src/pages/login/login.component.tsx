import React from 'react'
import { ButtonCircle } from '../../components/buttons/circle'
import auth from '../../firebaseSetup'
import customHooks from '../../utils/hooks'

export interface PageLoginProps {}

export default function PageLogin({}: PageLoginProps) {
  const isMounted = customHooks.useIsMounted()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    await auth.signOut()
  }

  return (
    <div>
      <ButtonCircle onClick={createAccount}>createAccount</ButtonCircle>
      <ButtonCircle onClick={signIn}>signIn</ButtonCircle>
      <ButtonCircle onClick={signOut}>signOut</ButtonCircle>
    </div>
  )
}
