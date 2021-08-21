import React from 'react'
import PageHelpDeskLayout from '../layout.component'

export interface PageHelpDeskAccountProps {}

export default function PageHelpDeskAccount({}: PageHelpDeskAccountProps) {
  return (
    <PageHelpDeskLayout endpoint="ACCOUNT">
      <span>Account</span>
    </PageHelpDeskLayout>
  )
}
