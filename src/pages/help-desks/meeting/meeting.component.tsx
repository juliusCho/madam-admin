import React from 'react'
import PageHelpDeskLayout from '../layout.component'

export interface PageHelpDeskMeetingProps {}

export default function PageHelpDeskMeeting({}: PageHelpDeskMeetingProps) {
  return (
    <PageHelpDeskLayout endpoint="MEETING">
      <span>Meeting</span>
    </PageHelpDeskLayout>
  )
}
