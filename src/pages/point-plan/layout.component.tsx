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

export interface PagePointPlanLayoutProps {
  children: React.ReactNode
}

function PagePointPlanLayout({ children }: PagePointPlanLayoutProps) {
  customHooks.usePage(ROUTER_TITLE.POINT_PLAN, ROUTER_PATH.POINT_PLAN)

  const [isMobile, setIsMobile] = React.useState(
    helpers.isMobile(MAX_WEB_BROWSER_WIDTH),
  )

  customHooks.useCheckMobile(setIsMobile, MAX_WEB_BROWSER_WIDTH)

  const firstLoading = Recoil.useRecoilValue(
    etcGlobalStates.firstTabLoadingState,
  )

  const firstHeight = 'calc(100vh - 11.25rem)'

  return (
    <>
      <LayoutHeader />
      <LayoutTab
        depth={1}
        tabs={helpers.firstDepthTab(ROUTER_PATH.POINT_PLAN, isMobile)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: firstHeight, opacity: 0.8 }}
          />
        }
        height={firstHeight}>
        <div className="fade-in">{children}</div>
      </LayoutTab>
    </>
  )
}

export default React.memo(PagePointPlanLayout)
