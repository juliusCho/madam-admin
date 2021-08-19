import React from 'react'
import { useHistory } from 'react-router'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import Recoil from 'recoil'
import { ROUTER_PATH } from '../../../constants'
import etcGlobalStates from '../../../recoil/etc'
import helpers from '../../../utils/helpers'
import { Alert } from '../../modals/alert'
import LayoutTabStyle from './tab.style'

export interface LayoutTabProps {
  tabs: Array<{ title: string; route: string; selected?: boolean }>
  children: React.ReactNode
  fontSize?: string
  selectedColor?: string
  selectedTextColor?: string
  backgroundColor?: string
  innerColor?: string
}

function LayoutTab({
  tabs,
  children,
  fontSize,
  selectedColor,
  selectedTextColor,
  backgroundColor,
  innerColor,
}: LayoutTabProps) {
  const history = useHistory()

  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)

  const [alertShow, setAlertShow] = React.useState(false)

  const onClick = (route: string) => {
    if (
      route === ROUTER_PATH.DASHBOARD.APP_USE ||
      route === ROUTER_PATH.DASHBOARD.BEST_MADAM ||
      route === ROUTER_PATH.DASHBOARD.USER ||
      route === ROUTER_PATH.DASHBOARD.COUPLING ||
      route === ROUTER_PATH.DASHBOARD.ETC ||
      !helpers.isMobile()
    ) {
      setLoading(true)
      history.push(route)
    } else {
      setAlertShow(true)
    }
  }

  const onAlertHide = () => {
    setAlertShow(false)
  }

  return (
    <>
      <Alert
        show={alertShow}
        msg="모바일 환경에서는 지원되지 않는 기능입니다."
        type="warning"
        showTime={1500}
        onHide={onAlertHide}
      />
      <Tabs
        className={LayoutTabStyle.container({ backgroundColor })}
        defaultIndex={tabs.findIndex((tab) => tab.selected)}>
        <TabList
          data-testid="layouts.tab.list"
          className={LayoutTabStyle.tabList}>
          {tabs.map((tab) => (
            <Tab
              key={tab.route}
              onClick={() => {
                if (!tab.selected) {
                  onClick(tab.route)
                }
              }}
              disabled={
                tab.route !== ROUTER_PATH.DASHBOARD.APP_USE &&
                tab.route !== ROUTER_PATH.DASHBOARD.BEST_MADAM &&
                tab.route !== ROUTER_PATH.DASHBOARD.USER &&
                tab.route !== ROUTER_PATH.DASHBOARD.COUPLING &&
                tab.route !== ROUTER_PATH.DASHBOARD.ETC &&
                helpers.isMobile()
              }
              selected={tab.selected}
              selectedClassName={
                tab.selected
                  ? `${LayoutTabStyle.selectedTabTitle({
                      fontSize,
                      selectedColor,
                      selectedTextColor,
                    })}`
                  : ''
              }
              className={
                !tab.selected
                  ? LayoutTabStyle.unselectedTabTitle({ fontSize })
                  : ''
              }>
              {tab.title}
              {tab.selected && (
                <div
                  className={LayoutTabStyle.selectedTabUnderline({
                    selectedColor,
                  })}
                  style={{ bottom: -2 }}
                />
              )}
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab) =>
          tab.selected ? (
            <TabPanel
              key={tab.route}
              className={LayoutTabStyle.tabPanel({
                selectedColor: innerColor,
              })}>
              {children}
            </TabPanel>
          ) : (
            <TabPanel key={tab.route}>
              <></>
            </TabPanel>
          ),
        )}
      </Tabs>
    </>
  )
}

LayoutTab.defaultProps = {
  fontSize: 'md:text-titleMedium md:font-titleMedium',
  selectedColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
  selectedTextColor:
    'text-main-blue hover:text-main-blueHover active:text-main-blueActive',
  backgroundColor: undefined,
  innerColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
}

export default React.memo(LayoutTab)
