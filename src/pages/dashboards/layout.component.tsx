import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'
import AppPageStyle from '../app.style'

export interface PageDashboardLayoutProps {
  endpoint: 'APP_USE' | 'BEST_MADAM' | 'USER' | 'COUPLING' | 'ETC'
  children: React.ReactNode
}

function PageDashboardLayout({ endpoint, children }: PageDashboardLayoutProps) {
  customHooks.usePage(
    ROUTER_TITLE.DASHBOARD[endpoint],
    ROUTER_PATH.DASHBOARD[endpoint],
  )

  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())

  customHooks.useCheckMobile(setIsMobile)

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )
  const secondLoading = Recoil.useRecoilValue(
    etcGlobalStates.secondTabLoadingState,
  )

  const firstHeight = 'calc(100vh - 11.25rem)'
  const secondHeight = 'calc(100vh - 15.35rem)'

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        loading={
          <Loading loading={firstLoading} style={{ height: firstHeight }} />
        }
        tabs={helpers.firstDepthTab(ROUTER_PATH.DASHBOARD[endpoint], isMobile)}
        height={firstHeight}>
        <LayoutTab
          depth={2}
          tabs={
            helpers.secondDepthTab(ROUTER_PATH.DASHBOARD[endpoint]).DASHBOARD
          }
          loading={
            <Loading loading={secondLoading} style={{ height: secondHeight }} />
          }
          height={secondHeight}
          {...AppPageStyle.layoutTabSecondDepthProps}>
          {children}
        </LayoutTab>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageDashboardLayout)
