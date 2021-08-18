import React from 'react'
import PageDashboardLayout from '../layout.component'

export interface PageDashboardUserProps {}

export default function PageDashboardUser({}: PageDashboardUserProps) {
  return (
    <PageDashboardLayout endpoint="USER">
      <div />
    </PageDashboardLayout>
  )
}
