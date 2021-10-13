import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import CountryChart from './country-chart'
import GenderChart from './gender-chart'
import GenderPreferChart from './gender-prefer-chart'

export interface PageDashboardUserProps {}

export default function PageDashboardUser({}: PageDashboardUserProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="USER">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <GenderChart
            token={token}
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <GenderPreferChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
          <CountryChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
