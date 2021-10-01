import React from 'react'
import PageDashboardLayout from '~/pages/dashboards/layout.component'

export interface PageDashboardCouplingProps {}

export default function PageDashboardCoupling({}: PageDashboardCouplingProps) {
  return (
    <PageDashboardLayout endpoint="COUPLING">
      <span>Coupling</span>
    </PageDashboardLayout>
  )
}
