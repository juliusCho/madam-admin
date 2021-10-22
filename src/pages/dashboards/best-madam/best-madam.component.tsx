import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import MadamPointChart from './madam-point-chart'
import RequestCountChart from './request-count-chart'
import RequestStatusChart from './request-status-chart'

export interface PageDashboardBestMadamProps {}

export default function PageDashboardBestMadam({}: PageDashboardBestMadamProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="BEST_MADAM">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <MadamPointChart
            device={device}
            className={PageDashboardStyle.chart({ device })}
          />
          <RequestCountChart className={PageDashboardStyle.chart({ device })} />
          <RequestStatusChart
            className={PageDashboardStyle.chart({ device })}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
