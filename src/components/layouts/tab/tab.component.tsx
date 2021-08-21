import React from 'react'
import { useHistory } from 'react-router'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import Recoil from 'recoil'
import etcGlobalStates from '../../../recoil/etc'
import LayoutTabStyle from './tab.style'

export interface LayoutTabProps {
  children: React.ReactNode
  loading: React.ReactNode
  depth: 1 | 2
  tabs: Array<{ title: string; route: string; selected?: boolean }>
  fontSize?: string
  selectedColor?: string
  selectedTextColor?: string
  backgroundColor?: string
  innerColor?: string
}

function LayoutTab({
  tabs,
  depth,
  loading,
  children,
  fontSize,
  selectedColor,
  selectedTextColor,
  backgroundColor,
  innerColor,
}: LayoutTabProps) {
  const history = useHistory()

  const setFirstLoading = Recoil.useSetRecoilState(
    etcGlobalStates.firstTabLoadingState,
  )
  const setSecondLoading = Recoil.useSetRecoilState(
    etcGlobalStates.secondTabLoadingState,
  )

  const onClick = (route: string) => {
    if (depth === 1) {
      setFirstLoading(true)
    } else {
      setSecondLoading(true)
    }
    history.push(route)
  }

  return (
    <>
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
              {loading}
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
  fontSize: 'md:text-titleBig md:font-titleBig',
  selectedColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
  selectedTextColor:
    'text-sub-darkPurple hover:text-sub-darkPurpleHover active:text-sub-darkPurpleActive',
  backgroundColor:
    'bg-mono-pale hover:bg-mono-paleHover active:bg-mono-paleActive',
  innerColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
}

export default React.memo(LayoutTab)
