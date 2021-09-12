import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import deviceGlobalStates from '../../recoil/device'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'
import AppPageStyle from '../app.style'

export interface PageDashboardLayoutProps {
  endpoint: 'APP_USE' | 'BEST_MADAM' | 'USER' | 'COUPLING' | 'ETC'
  children: React.ReactNode
}

function PageDashboardLayout({ endpoint, children }: PageDashboardLayoutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  customHooks.usePage(
    ROUTER_TITLE.DASHBOARD[endpoint],
    ROUTER_PATH.DASHBOARD[endpoint],
  )

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )
  const secondLoading = Recoil.useRecoilValue(
    etcGlobalStates.secondTabLoadingState,
  )

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: AppPageStyle.tabFirstHeight }}
          />
        }
        tabs={helpers.firstDepthTab(ROUTER_PATH.DASHBOARD[endpoint], device)}
        height={AppPageStyle.tabFirstHeight}
        {...AppPageStyle.layoutTabFirstDepthProps}>
        <LayoutTab
          depth={2}
          tabs={
            helpers.secondDepthTab(ROUTER_PATH.DASHBOARD[endpoint]).DASHBOARD
          }
          loading={
            <Loading
              loading={secondLoading}
              style={{ height: AppPageStyle.tabSecondHeight }}
            />
          }
          height={AppPageStyle.tabSecondHeight}
          {...AppPageStyle.layoutTabSecondDepthProps}>
          <div className="fade-in">{children}</div>
        </LayoutTab>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageDashboardLayout)
