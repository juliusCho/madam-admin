import React from 'react'
import Recoil from 'recoil'
import auth from '../firebaseSetup'
import globalStates from '../recoil/user'
import customHooks from '../utils/hooks'
import { PageLogin } from './login'

function App() {
  const [user, setUser] = Recoil.useRecoilState(globalStates.userState)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
  }, [])

  return <PageLogin />
}

export default App
