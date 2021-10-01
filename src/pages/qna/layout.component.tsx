import React from 'react'
import Recoil from 'recoil'
import { Loading } from '~/components/etc/loading'
import { LayoutHeader } from '~/components/layouts/header'
import { LayoutTab } from '~/components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '~/constants/etc'
import AppPageStyle from '~/pages/app.style'
import deviceGlobalStates from '~/states/device'
import etcGlobalStates from '~/states/etc'
import helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'

export interface PageQnaLayoutProps {
  children: React.ReactNode
}

function PageQnaLayout({ children }: PageQnaLayoutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  customHooks.usePage(ROUTER_TITLE.QNA, ROUTER_PATH.QNA)

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        tabs={helpers.firstDepthTab(ROUTER_PATH.QNA, device)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: AppPageStyle.tabFirstHeight }}
          />
        }
        height={AppPageStyle.tabFirstHeight}>
        <div className="fade-in">{children}</div>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageQnaLayout)
