import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import CharmPurchaseChart from './charm-purchase-chart'
import ChatCountChart from './chat-count-chart'
import InquiryCountChart from './inquiry-count-chart'

export interface PageDashboardEtcProps {}

export default function PageDashboardEtc({}: PageDashboardEtcProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="ETC">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <CharmPurchaseChart
            className={PageDashboardStyle.chart({ device })}
          />
          <ChatCountChart className={PageDashboardStyle.chart({ device })} />
          <InquiryCountChart className={PageDashboardStyle.chart({ device })} />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
