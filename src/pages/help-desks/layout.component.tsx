import React from 'react'
import Recoil from 'recoil'
import { Loading } from '../../components/etc/loading'
import { LayoutHeader } from '../../components/layouts/header'
import { LayoutTab } from '../../components/layouts/tab'
import { ROUTER_PATH, ROUTER_TITLE } from '../../constants'
import etcGlobalStates from '../../recoil/etc'
import helpers from '../../utils/helpers'
import customHooks from '../../utils/hooks'

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
  customHooks.usePage(
    ROUTER_TITLE.HELP_DESK[endpoint],
    ROUTER_PATH.HELP_DESK[endpoint],
  )

  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())

  customHooks.useCheckMobile(setIsMobile)

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
        tabs={helpers.firstDepthTab(ROUTER_PATH.HELP_DESK[endpoint], isMobile)}
        loading={
          <Loading
            loading={firstLoading}
            style={{ height: 'calc(100% - 11.25rem)' }}
          />
        }>
        <LayoutTab
          depth={2}
          tabs={
            helpers.secondDepthTab(ROUTER_PATH.HELP_DESK[endpoint]).HELP_DESK
          }
          loading={
            <Loading
              loading={secondLoading}
              style={{ height: 'calc(100% - 14.5rem)' }}
            />
          }
          fontSize="md:text-titleMedium md:font-titleMedium"
          backgroundColor="bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive"
          selectedColor="bg-mono-paleWhite hover:bg-mono-paleWhiteHover active:bg-mono-paleWhiteActive"
          selectedTextColor="text-main-blue hover:text-main-blueHover active:text-main-blueActive"
          innerColor="bg-mono-paleWhite hover:bg-mono-paleWhiteHover active:bg-mono-paleWhiteActive">
          {children}
        </LayoutTab>
      </LayoutTab>
    </>
  )
}

export default React.memo(PageHelpDeskLayout)
