import React from 'react'
import PageDashboardLayout from '../layout.component'

export interface PageDashboardEtcProps {}

export default function PageDashboardEtc({}: PageDashboardEtcProps) {
  return (
    <PageDashboardLayout endpoint="ETC">
      <span>Etc</span>
    </PageDashboardLayout>
  )
}
