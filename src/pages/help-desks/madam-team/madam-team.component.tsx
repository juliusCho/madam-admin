import React from 'react'
import PageHelpDeskLayout from '~/pages/help-desks/layout.component'

export interface PageHelpDeskMadamTeamProps {}

export default function PageHelpDeskMadamTeam({}: PageHelpDeskMadamTeamProps) {
  return (
    <PageHelpDeskLayout endpoint="MADAM_TEAM">
      <span>Madam Team</span>
    </PageHelpDeskLayout>
  )
}
