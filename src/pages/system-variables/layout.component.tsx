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

export interface PageSystemVariableLayoutProps {
  endpoint: 'CONFIG' | 'PROFILE' | 'SELECT'
  children: React.ReactNode
}

function PageSystemVariableLayout({
  endpoint,
  children,
}: PageSystemVariableLayoutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  customHooks.usePage(
    ROUTER_TITLE.SYSTEM_VARIABLE[endpoint],
    ROUTER_PATH.SYSTEM_VARIABLE[endpoint],
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
        tabs={helpers.firstDepthTab(
          ROUTER_PATH.SYSTEM_VARIABLE[endpoint],
          device,
        )}
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
            helpers.secondDepthTab(ROUTER_PATH.SYSTEM_VARIABLE[endpoint])
              .SYSTEM_VARIABLE
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

export default React.memo(PageSystemVariableLayout)
