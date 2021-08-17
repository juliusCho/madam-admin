import React from 'react'
import { useHistory } from 'react-router'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
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

  const onClick = (route: string) => {
    history.push(route)
  }

  return (
    <Tabs className={LayoutTabStyle.container({ backgroundColor })}>
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
      <TabPanel
        className={LayoutTabStyle.tabPanel({ selectedColor: innerColor })}>
        {children}
      </TabPanel>
      {[...tabs].splice(0, tabs.length - 1).map((tab) => (
        <TabPanel key={tab.route}>
          <></>
        </TabPanel>
      ))}
    </Tabs>
  )
}

LayoutTab.defaultProps = {
  fontSize: 'titleMedium',
  selectedColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
  selectedTextColor:
    'text-main-blue hover:text-main-blueHover active:text-main-blueActive',
  backgroundColor: undefined,
  innerColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
}

export default React.memo(LayoutTab)
