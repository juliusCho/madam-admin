import React from 'react'
import PageUserLayout from '../layout.component'

export interface PageUserProfileProps {}

export default function PageUserProfile({}: PageUserProfileProps) {
  return (
    <PageUserLayout endpoint="PROFILE">
      <span>Profile</span>
    </PageUserLayout>
  )
}
