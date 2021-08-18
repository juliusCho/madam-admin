import React from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import {
  firstDepthTab,
  ROUTER_PATH,
  ROUTER_TITLE,
  secondDepthTab,
} from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import userGlobalStates from '../../recoil/user'
import customHooks from '../../utils/hooks'

export interface PageSystemVariableLayoutProps {
  endpoint: 'CONFIG' | 'PROFILE' | 'SELECT'
  children: React.ReactNode
}

function PageSystemVariableLayout({
  endpoint,
  children,
}: PageSystemVariableLayoutProps) {
  useTitle(ROUTER_TITLE.SYSTEM_VARIABLE[endpoint])

  const history = useHistory()

  const user = Recoil.useRecoilValue(userGlobalStates.userState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    if (history.location.pathname === ROUTER_PATH.SYSTEM_VARIABLE[endpoint]) {
      setLoading(() => false)
    }
  }, [
    isMounted,
    history.location.pathname,
    ROUTER_PATH.SYSTEM_VARIABLE[endpoint],
  ])

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
        tabs={firstDepthTab(ROUTER_PATH.SYSTEM_VARIABLE[endpoint])}
        backgroundColor="bg-mono-pale hover:bg-mono-paleHover active:bg-mono-paleActive"
        fontSize="titleBig"
        selectedTextColor="text-sub-darkPurple hover:text-sub-darkPurpleHover active:text-sub-darkPurpleActive">
        <LayoutTab
          tabs={[
            ...secondDepthTab(ROUTER_PATH.SYSTEM_VARIABLE[endpoint])
              .SYSTEM_VARIABLE,
          ]}
          backgroundColor="bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive"
          selectedColor="bg-mono-paleWhite hover:bg-mono-paleWhiteHover active:bg-mono-paleWhiteActive"
          innerColor="bg-mono-paleWhite hover:bg-mono-paleWhiteHover active:bg-mono-paleWhiteActive">
          {children}
        </LayoutTab>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageSystemVariableLayout)
