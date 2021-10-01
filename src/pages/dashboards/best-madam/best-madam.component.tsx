import React from 'react'
import Recoil from 'recoil'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'

export interface PageDashboardBestMadamProps {}

export default function PageDashboardBestMadam({}: PageDashboardBestMadamProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  return (
    <PageDashboardLayout endpoint="BEST_MADAM">
      <span>Best Madam</span>
    </PageDashboardLayout>
  )
}
