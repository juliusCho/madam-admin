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

export interface PageSystemVariableLayoutProps {
  endpoint: 'CONFIG' | 'PROFILE' | 'SELECT'
  children: React.ReactNode
}

function PageSystemVariableLayout({
  endpoint,
  children,
}: PageSystemVariableLayoutProps) {
  customHooks.usePage(
    ROUTER_TITLE.SYSTEM_VARIABLE[endpoint],
    ROUTER_PATH.SYSTEM_VARIABLE[endpoint],
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
        tabs={helpers.firstDepthTab(
          ROUTER_PATH.SYSTEM_VARIABLE[endpoint],
          isMobile,
        )}
        loading={
          <Loading loading={firstLoading} style={{ height: firstHeight }} />
        }
        height={firstHeight}>
        <LayoutTab
          depth={2}
          tabs={
            helpers.secondDepthTab(ROUTER_PATH.SYSTEM_VARIABLE[endpoint])
              .SYSTEM_VARIABLE
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

export default React.memo(PageSystemVariableLayout)
