import React from 'react'
import { RouterProps } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { LayoutHeader } from '../../../components/layouts/header'
import { LayoutTab } from '../../../components/layouts/tab'
import etcGlobalStates from '../../../recoil/etc'
import userGlobalStates from '../../../recoil/user'
import {
  firstDepthTab,
  ROUTER_PATH,
  ROUTER_TITLE,
  secondDepthTab,
} from '../../../types'
import customHooks from '../../../utils/hooks'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({
  history,
}: PageDashboardAppUseProps & RouterProps) {
  useTitle(ROUTER_TITLE.DASHBOARD.APP_USE)

  const [user, setUser] = Recoil.useRecoilState(userGlobalStates.userState)
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
    <>
      <LayoutHeader />
      <LayoutTab
        tabs={firstDepthTab(ROUTER_PATH.DASHBOARD.APP_USE)}
        backgroundColor="mono.pale"
        fontSize="titleBig"
        selectedTextColor="sub.darkPurple">
        <LayoutTab
          tabs={secondDepthTab(ROUTER_PATH.DASHBOARD.APP_USE).DASHBOARD}
          backgroundColor="mono.white"
          selectedColor="mono.paleWhite"
          innerColor="mono.paleWhite">
          <div />
        </LayoutTab>
      </LayoutTab>
    </>
  )
}
