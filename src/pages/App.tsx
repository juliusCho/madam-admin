import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Recoil from 'recoil'
import { Loading } from '../components/etc/loading'
import { ROUTER_PATH } from '../constants'
import auth from '../firebaseSetup'
import etcGlobalStates from '../recoil/etc'
import userGlobalStates from '../recoil/user'
import customHooks from '../utils/hooks'
import { PageDashboardAppUse } from './dashboards/app-use'
import { PageLogin } from './login'

function App() {
  const user = Recoil.useRecoilValue(userGlobalStates.userState)
  const loading = Recoil.useRecoilValue(etcGlobalStates.loadingState)

  const isMounted = customHooks.useIsMounted()

  const history = useHistory()

  React.useEffect(() => {
    if (!isMounted()) return

    if (user === null) {
      auth.signOut()

      history.push(ROUTER_PATH.LOGIN)
    } else {
      history.push(ROUTER_PATH.DASHBOARD.APP_USE)
    }
  }, [isMounted, user])

  return (
    <>
      <Loading loading={loading} />
      <Switch>
        <Route path="/" exact component={() => <></>} />
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
