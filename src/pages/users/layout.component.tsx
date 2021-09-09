import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import {
  MAX_WEB_BROWSER_WIDTH,
  ROUTER_PATH,
  ROUTER_TITLE,
} from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'
import AppPageStyle from '../app.style'

export interface PageUserLayoutProps {
  endpoint: 'BLOCK' | 'INTEREST' | 'PHOTO' | 'PROFILE'
  children: React.ReactNode
}

function PageUserLayout({ endpoint, children }: PageUserLayoutProps) {
  customHooks.usePage(ROUTER_TITLE.USER[endpoint], ROUTER_PATH.USER[endpoint])

  const [isMobile, setIsMobile] = React.useState(
    helpers.isMobile(MAX_WEB_BROWSER_WIDTH),
  )

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
        tabs={helpers.firstDepthTab(ROUTER_PATH.USER[endpoint], isMobile)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: firstHeight, opacity: 0.8 }}
          />
        }
        height={firstHeight}
        {...AppPageStyle.layoutTabFirstDepthProps}>
        <LayoutTab
          depth={2}
          tabs={helpers.secondDepthTab(ROUTER_PATH.USER[endpoint]).USER}
          loading={
            <Loading
              loading={secondLoading}
              style={{ height: secondHeight, opacity: 0.5 }}
            />
          }
          height={secondHeight}
          {...AppPageStyle.layoutTabSecondDepthProps}>
          <div className="fade-in">{children}</div>
        </LayoutTab>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageUserLayout)
