import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import CoupleStatusChart from './couple-status-chart'
import MatchCountChart from './match-count-chart'

export interface PageDashboardCouplingProps {}

export default function PageDashboardCoupling({}: PageDashboardCouplingProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="COUPLING">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <CoupleStatusChart className={PageDashboardStyle.chart({ device })} />
          <MatchCountChart className={PageDashboardStyle.chart({ device })} />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
