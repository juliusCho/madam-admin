import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'

export interface PagePointPlanLayoutProps {
  children: React.ReactNode
}

function PagePointPlanLayout({ children }: PagePointPlanLayoutProps) {
  customHooks.usePage(ROUTER_TITLE.POINT_PLAN, ROUTER_PATH.POINT_PLAN)

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
        tabs={helpers.firstDepthTab(ROUTER_PATH.POINT_PLAN, isMobile)}
        loading={
          <Loading loading={firstLoading} style={{ height: firstHeight }} />
        }
        height={firstHeight}>
        {children}
      </LayoutTab>
    </>
  )
}

export default React.memo(PagePointPlanLayout)
