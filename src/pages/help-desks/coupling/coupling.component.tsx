import React from 'react'
import PageHelpDeskLayout from '~/pages/help-desks/layout.component'

export interface PageHelpDeskCouplingProps {}

export default function PageHelpDeskCoupling({}: PageHelpDeskCouplingProps) {
  return (
    <PageHelpDeskLayout endpoint="COUPLING">
      <span>Coupling</span>
    </PageHelpDeskLayout>
  )
}
