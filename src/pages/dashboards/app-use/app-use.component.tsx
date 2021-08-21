import React from 'react'
import PageDashboardLayout from '../layout.component'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({}: PageDashboardAppUseProps) {
  return (
    <PageDashboardLayout endpoint="APP_USE">
      <span>App Use</span>
    </PageDashboardLayout>
  )
}
