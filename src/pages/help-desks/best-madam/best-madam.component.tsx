import React from 'react'
import PageHelpDeskLayout from '~/pages/help-desks/layout.component'

export interface PageHelpDeskBestMadamProps {}

export default function PageHelpDeskBestMadam({}: PageHelpDeskBestMadamProps) {
  return (
    <PageHelpDeskLayout endpoint="BEST_MADAM">
      <span>Best Madam</span>
    </PageHelpDeskLayout>
  )
}
