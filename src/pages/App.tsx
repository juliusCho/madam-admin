import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Recoil from 'recoil'
import { Alert } from '../components/modals/alert'
import auth from '../firebaseSetup'
import userGlobalStates from '../recoil/user'
import { ROUTER_PATH } from '../types'
import customHooks from '../utils/hooks'
import { PageDashboardAppUse } from './dashboards/app-use'
import { PageLogin } from './login'

function App() {
  const user = Recoil.useRecoilValue(userGlobalStates.userState)

  const [showAlert, setShowAlert] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')

  const isMounted = customHooks.useIsMounted()

  const history = useHistory()

  React.useEffect(() => {
    if (!isMounted()) return

    if (user === null) {
      setAlertMsg(() => '로그아웃 되었습니다.')

      auth.signOut()

      history.push(ROUTER_PATH.LOGIN)
    } else {
      setAlertMsg(() => '로그인 되었습니다.')

      history.push(ROUTER_PATH.DASHBOARD.APP_USE)
    }

    setShowAlert(() => true)
  }, [isMounted, user])

  const onHide = () => {
    setShowAlert(false)
  }

  return (
    <>
      <Alert
        show={showAlert}
        msg={alertMsg}
        type="info"
        showTime={1500}
        onHide={onHide}
      />
      <Switch>
        <Route path={ROUTER_PATH.LOGIN} component={PageLogin} />
        <Route
          path={ROUTER_PATH.DASHBOARD.APP_USE}
          component={PageDashboardAppUse}
        />
      </Switch>
    </>
  )
}

export default App
