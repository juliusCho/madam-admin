import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import PageDashboardAppUseStyle from './app-use.style'
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
      <div className={PageDashboardAppUseStyle.container({ device })}>
        <div className={PageDashboardAppUseStyle.row({ device })}>
          <UserStatusChart
            token={token}
            className={`${PageDashboardAppUseStyle.chart({ device })} mt-5`}
          />
          <JoinQuitChart
            token={token}
            className={PageDashboardAppUseStyle.chart({ device })}
          />
        </div>
        <div className={PageDashboardAppUseStyle.row({ device })}>
          <ReportChart
            token={token}
            className={PageDashboardAppUseStyle.chart({ device })}
          />
          <InviteJoinChart
            token={token}
            className={PageDashboardAppUseStyle.chart({ device })}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
