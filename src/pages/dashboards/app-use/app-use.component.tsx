import React from 'react'
import { RouterProps } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import etcGlobalStates from '../../../recoil/etc'
import userGlobalStates from '../../../recoil/user'
import { ROUTER_PATH, ROUTER_TITLE } from '../../../types'
import customHooks from '../../../utils/hooks'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({
  history,
}: PageDashboardAppUseProps & RouterProps) {
  useTitle(ROUTER_TITLE.DASHBOARD.APP_USE)

  const user = Recoil.useRecoilValue(userGlobalStates.userState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    if (history.location.pathname === ROUTER_PATH.DASHBOARD.APP_USE) {
      setLoading(() => false)
    }
  }, [isMounted, history.location.pathname, ROUTER_PATH.DASHBOARD.APP_USE])

  React.useEffect(() => {
    if (!isMounted()) return

    if (user === null) {
      setLoading(() => true)
      history.push(ROUTER_PATH.LOGIN)
    }
  }, [isMounted, user, history.push, ROUTER_PATH.LOGIN])

  return (
    <div>
      <span>WELCOME, {user?.name}!</span>
    </div>
  )
}
