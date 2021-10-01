import React from 'react'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'

export interface PageSystemVariableProfileProps {}

export default function PageSystemVariableProfile({}: PageSystemVariableProfileProps) {
  return (
    <PageSystemVariableLayout endpoint="PROFILE">
      <span>Profile</span>
    </PageSystemVariableLayout>
  )
}
