import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Recoil from 'recoil'
import { ButtonToTop } from '../components/buttons/to-top'
import { Loading } from '../components/etc/loading'
import { Alert } from '../components/modals/alert'
import { ROUTER_PATH } from '../constants'
import auth from '../firebaseSetup'
import adminGlobalStates from '../recoil/admin'
import deviceGlobalStates from '../recoil/device'
import etcGlobalStates from '../recoil/etc'
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

export default function App() {
  const isMobile = Recoil.useRecoilValue(deviceGlobalStates.isMobile)
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)
  const [token, setToken] = Recoil.useRecoilState(adminGlobalStates.tokenState)
  const loading = Recoil.useRecoilValue(etcGlobalStates.loadingState)
  const { show, msg, type, time } = Recoil.useRecoilValue(
    etcGlobalStates.alertState,
  )
  const setAlert = Recoil.useSetRecoilState(etcGlobalStates.alertState)

  const [showToTop, setShowToTop] = React.useState(false)

  const isMounted = customHooks.useIsMounted()

  customHooks.useCheckMobile(isMobile, setShowToTop)

  const history = useHistory()

  React.useEffect(() => {
    if (!isMounted()) return

    if (admin === null) {
      auth.signOut()

      setToken(() => '')

      history.push(ROUTER_PATH.LOGIN)
    } else {
      history.push(ROUTER_PATH.DASHBOARD.APP_USE)
    }
  }, [isMounted, admin])

  React.useEffect(() => {
    if (!isMounted()) return
    if (admin === null) return
    if (token) return

    setAlert((old) => ({
      ...old,
      show: true,
      type: 'warning',
      msg: '로그인이 만료되었습니다. 다시 로그인 해 주세요.',
      time: 1500,
    }))
  }, [isMounted, admin, token])

  return (
    <>
      <Alert
        show={show}
        msg={msg}
        type={type}
        showTime={time}
        onHide={() => setAlert((old) => ({ ...old, show: false }))}
      />
      <Loading loading={loading} style={{ height: '100vh', bottom: 0 }} />
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
      <ButtonToTop show={showToTop} />
    </>
  )
}
