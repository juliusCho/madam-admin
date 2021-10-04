import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import PageDashboardBestMadamStyle from './best-madam.style'
import MadamPointChart from './madam-point-chart'
import RequestCountChart from './request-count-chart'
import RequestStatusChart from './request-status-chart'

export interface PageDashboardBestMadamProps {}

export default function PageDashboardBestMadam({}: PageDashboardBestMadamProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="BEST_MADAM">
      <div className={PageDashboardBestMadamStyle.container({ device })}>
        <div className={PageDashboardBestMadamStyle.row({ device })}>
          <MadamPointChart
            device={device}
            token={token}
            className={PageDashboardBestMadamStyle.chart({ device })}
          />
          <RequestCountChart
            token={token}
            className={PageDashboardBestMadamStyle.chart({ device })}
          />
          <RequestStatusChart
            token={token}
            className={PageDashboardBestMadamStyle.chart({ device })}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
