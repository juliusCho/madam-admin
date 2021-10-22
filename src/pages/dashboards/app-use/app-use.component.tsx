import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import InviteJoinChart from './invite-join-chart'
import JoinQuitChart from './join-quit-chart'
import ReportChart from './report-chart'
import UserStatusChart from './user-status-chart'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({}: PageDashboardAppUseProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="APP_USE">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <UserStatusChart
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <JoinQuitChart className={PageDashboardStyle.chart({ device })} />
        </div>
        <div className={PageDashboardStyle.row({ device })}>
          <ReportChart className={PageDashboardStyle.chart({ device })} />
          <InviteJoinChart className={PageDashboardStyle.chart({ device })} />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
