import React from 'react'
import PageHelpDeskLayout from '~/pages/help-desks/layout.component'

export interface PageHelpDeskBaseUseProps {}

export default function PageHelpDeskBaseUse({}: PageHelpDeskBaseUseProps) {
  return (
    <PageHelpDeskLayout endpoint="BASE_USE">
      <span>Base Use</span>
    </PageHelpDeskLayout>
  )
}
