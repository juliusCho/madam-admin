import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'

export interface PageQnaLayoutProps {
  children: React.ReactNode
}

function PageQnaLayout({ children }: PageQnaLayoutProps) {
  customHooks.usePage(ROUTER_TITLE.QNA, ROUTER_PATH.QNA)

  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())

  customHooks.useCheckMobile(setIsMobile)

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )

  const firstHeight = 'calc(100vh - 11.25rem)'

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        tabs={helpers.firstDepthTab(ROUTER_PATH.QNA, isMobile)}
        loading={
          <Loading loading={firstLoading} style={{ height: firstHeight }} />
        }
        height={firstHeight}>
        {children}
      </LayoutTab>
    </>
  )
}

export default React.memo(PageQnaLayout)
