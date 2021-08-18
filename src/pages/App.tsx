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
import { PageDashboardBestMadam } from './dashboards/best-madam'
import { PageDashboardCoupling } from './dashboards/coupling'
import { PageDashboardEtc } from './dashboards/etc'
import { PageDashboardUser } from './dashboards/user'
import { PageHelpDeskAccount } from './help-desks/account'
import { PageHelpDeskBaseUse } from './help-desks/base-use'
import { PageHelpDeskBestMadam } from './help-desks/best-madam'
import { PageHelpDeskCoupling } from './help-desks/coupling'
import { PageHelpDeskMadamTeam } from './help-desks/madam-team'
import { PageHelpDeskMeeting } from './help-desks/meeting'
import { PageLogin } from './login'
import { PagePointPlan } from './point-plan'
import { PageQna } from './qna'
import { PageSystemVariableConfig } from './system-variables/config'
import { PageSystemVariableProfile } from './system-variables/profile'
import { PageSystemVariableSelect } from './system-variables/select'
import { PageUserBlock } from './users/block'
import { PageUserInterest } from './users/interest'
import { PageUserPhoto } from './users/photo'
import { PageUserProfile } from './users/profile'

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
        <Route
          path={ROUTER_PATH.DASHBOARD.BEST_MADAM}
          component={PageDashboardBestMadam}
        />
        <Route
          path={ROUTER_PATH.DASHBOARD.USER}
          component={PageDashboardUser}
        />
        <Route
          path={ROUTER_PATH.DASHBOARD.COUPLING}
          component={PageDashboardCoupling}
        />
        <Route path={ROUTER_PATH.DASHBOARD.ETC} component={PageDashboardEtc} />
        <Route
          path={ROUTER_PATH.SYSTEM_VARIABLE.CONFIG}
          component={PageSystemVariableConfig}
        />
        <Route
          path={ROUTER_PATH.SYSTEM_VARIABLE.PROFILE}
          component={PageSystemVariableProfile}
        />
        <Route
          path={ROUTER_PATH.SYSTEM_VARIABLE.SELECT}
          component={PageSystemVariableSelect}
        />
        <Route path={ROUTER_PATH.POINT_PLAN} component={PagePointPlan} />
        <Route
          path={ROUTER_PATH.HELP_DESK.BASE_USE}
          component={PageHelpDeskBaseUse}
        />
        <Route
          path={ROUTER_PATH.HELP_DESK.ACCOUNT}
          component={PageHelpDeskAccount}
        />
        <Route
          path={ROUTER_PATH.HELP_DESK.COUPLING}
          component={PageHelpDeskCoupling}
        />
        <Route
          path={ROUTER_PATH.HELP_DESK.MEETING}
          component={PageHelpDeskMeeting}
        />
        <Route
          path={ROUTER_PATH.HELP_DESK.BEST_MADAM}
          component={PageHelpDeskBestMadam}
        />
        <Route
          path={ROUTER_PATH.HELP_DESK.MADAM_TEAM}
          component={PageHelpDeskMadamTeam}
        />
        <Route path={ROUTER_PATH.QNA} component={PageQna} />
        <Route path={ROUTER_PATH.USER.BLOCK} component={PageUserBlock} />
        <Route path={ROUTER_PATH.USER.INTEREST} component={PageUserInterest} />
        <Route path={ROUTER_PATH.USER.PHOTO} component={PageUserPhoto} />
        <Route path={ROUTER_PATH.USER.PROFILE} component={PageUserProfile} />
      </Switch>
    </>
  )
}

export default App
