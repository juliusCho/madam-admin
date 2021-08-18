import React from 'react'
import PageHelpDeskLayout from '../layout.component'

export interface PageHelpDeskBaseUseProps {}

export default function PageHelpDeskBaseUse({}: PageHelpDeskBaseUseProps) {
  return (
    <PageHelpDeskLayout endpoint="BASE_USE">
      <div />
    </PageHelpDeskLayout>
  )
}
