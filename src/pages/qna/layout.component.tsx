import React from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { firstDepthTab, ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import userGlobalStates from '../../recoil/user'
import customHooks from '../../utils/hooks'

export interface PageQnaLayoutProps {
  children: React.ReactNode
}

function PageQnaLayout({ children }: PageQnaLayoutProps) {
  useTitle(ROUTER_TITLE.POINT_PLAN)

  const history = useHistory()

  const user = Recoil.useRecoilValue(userGlobalStates.userState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    if (history.location.pathname === ROUTER_PATH.QNA) {
      setLoading(() => false)
    }
  }, [isMounted, history.location.pathname, ROUTER_PATH.QNA])

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
        tabs={firstDepthTab(ROUTER_PATH.QNA)}
        backgroundColor="bg-mono-pale hover:bg-mono-paleHover active:bg-mono-paleActive"
        fontSize="titleBig"
        selectedTextColor="text-sub-darkPurple hover:text-sub-darkPurpleHover active:text-sub-darkPurpleActive">
        {children}
      </LayoutTab>
    </>
  )
}

export default React.memo(PageQnaLayout)
