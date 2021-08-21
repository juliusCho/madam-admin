import React from 'react'
import PageSystemVariableLayout from '../layout.component'

export interface PageSystemVariableProfileProps {}

export default function PageSystemVariableProfile({}: PageSystemVariableProfileProps) {
  return (
    <PageSystemVariableLayout endpoint="PROFILE">
      <span>Profile</span>
    </PageSystemVariableLayout>
  )
}
