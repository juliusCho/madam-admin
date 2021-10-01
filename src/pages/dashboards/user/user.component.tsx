import React from 'react'
import PageDashboardLayout from '~/pages/dashboards/layout.component'

export interface PageDashboardUserProps {}

export default function PageDashboardUser({}: PageDashboardUserProps) {
  return (
    <PageDashboardLayout endpoint="USER">
      <span>User</span>
    </PageDashboardLayout>
  )
}
