import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import InviteJoinChart from './invite-join-chart'
import JoinQuitChart from './join-quit-chart'
import ReportChart from './report-chart'
import UserStatusChart from './user-status-chart'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({}: PageDashboardAppUseProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="APP_USE">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <UserStatusChart
            token={token}
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <JoinQuitChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
        </div>
        <div className={PageDashboardStyle.row({ device })}>
          <ReportChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
          <InviteJoinChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
