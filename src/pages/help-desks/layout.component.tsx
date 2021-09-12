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

export interface PageHelpDeskLayoutProps {
  endpoint:
    | 'BASE_USE'
    | 'ACCOUNT'
    | 'COUPLING'
    | 'MEETING'
    | 'BEST_MADAM'
    | 'MADAM_TEAM'
  children: React.ReactNode
}

function PageHelpDeskLayout({ endpoint, children }: PageHelpDeskLayoutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  customHooks.usePage(
    ROUTER_TITLE.HELP_DESK[endpoint],
    ROUTER_PATH.HELP_DESK[endpoint],
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
        tabs={helpers.firstDepthTab(ROUTER_PATH.HELP_DESK[endpoint], device)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: AppPageStyle.tabFirstHeight }}
          />
        }
        height={AppPageStyle.tabFirstHeight}
        {...AppPageStyle.layoutTabFirstDepthProps}>
        <LayoutTab
          depth={2}
          tabs={
            helpers.secondDepthTab(ROUTER_PATH.HELP_DESK[endpoint]).HELP_DESK
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

export default React.memo(PageHelpDeskLayout)
