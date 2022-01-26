import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Recoil from 'recoil'
import apiAdmin from '~/apis/admin'
import { ButtonToTop } from '~/components/buttons/to-top'
import { Loading } from '~/components/etc/loading'
import { Alert } from '~/components/modals/alert'
import { ROUTER_PATH } from '~/constants/etc'
import auth from '~/firebaseSetup'
import { PageDashboardAppUse } from '~/pages/dashboards/app-use'
import { PageDashboardBestMadam } from '~/pages/dashboards/best-madam'
import { PageDashboardCoupling } from '~/pages/dashboards/coupling'
import { PageDashboardEtc } from '~/pages/dashboards/etc'
import { PageDashboardUser } from '~/pages/dashboards/user'
import { PageHelpDeskAccount } from '~/pages/help-desks/account'
import { PageHelpDeskBaseUse } from '~/pages/help-desks/base-use'
import { PageHelpDeskBestMadam } from '~/pages/help-desks/best-madam'
import { PageHelpDeskCoupling } from '~/pages/help-desks/coupling'
import { PageHelpDeskMadamTeam } from '~/pages/help-desks/madam-team'
import { PageHelpDeskMeeting } from '~/pages/help-desks/meeting'
import { PageLogin } from '~/pages/login'
import { PagePointPlan } from '~/pages/point-plan'
import { PageQna } from '~/pages/qna'
import { PageSystemVariableConfig } from '~/pages/system-variables/config'
import { PageSystemVariableProfile } from '~/pages/system-variables/profile'
import { PageSystemVariableSelect } from '~/pages/system-variables/select'
import { PageUserBlock } from '~/pages/users/block'
import { PageUserInterest } from '~/pages/users/interest'
import { PageUserPhoto } from '~/pages/users/photo'
import { PageUserProfile } from '~/pages/users/profile'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import etcGlobalStates from '~/states/etc'
import customHooks from '~/utils/hooks'

export default function App() {
  const isMobile = Recoil.useRecoilValue(deviceGlobalStates.isMobile)
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)
  const setAdminList = Recoil.useSetRecoilState(
    adminGlobalStates.adminListState,
  )
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
    if (!isMounted()) return () => {}

    if (admin === null) {
      if (auth?.signOut) {
        auth.signOut()
      }

      history.push(ROUTER_PATH.LOGIN)

      return () => {}
    }
    history.push(ROUTER_PATH.DASHBOARD.APP_USE)

    const subscription = apiAdmin.apiAdminList$().subscribe({
      next: (list) => setAdminList(() => list),
      error: () => setAdminList(() => []),
    })

    return () => subscription.unsubscribe()
  }, [isMounted, admin, auth?.signOut, history.push, ROUTER_PATH])

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
