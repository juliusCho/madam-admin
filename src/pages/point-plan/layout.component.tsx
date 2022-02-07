import React from 'react'
import Recoil from 'recoil'
import { Loading } from '~/components/etc/loading'
import { LayoutHeader } from '~/components/layouts/header'
import { LayoutTab } from '~/components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '~/constants/etc'
import AppPageStyle from '~/pages/app.style'
import deviceGlobalStates from '~/states/device'
import etcGlobalStates from '~/states/etc'
import * as helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'

export interface PagePointPlanLayoutProps {
  children: React.ReactNode
}

function PagePointPlanLayout({ children }: PagePointPlanLayoutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  customHooks.usePage(ROUTER_TITLE.POINT_PLAN, ROUTER_PATH.POINT_PLAN)

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        tabs={helpers.firstDepthTab(ROUTER_PATH.POINT_PLAN, device)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: AppPageStyle.tabFirstHeight }}
          />
        }
        height={AppPageStyle.tabFirstHeight}>
        <div className="fade-in h-full">{children}</div>
      </LayoutTab>
    </>
  )
}

export default React.memo(PagePointPlanLayout)
