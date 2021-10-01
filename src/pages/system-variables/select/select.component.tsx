import React from 'react'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'

export interface PageSystemVariableSelectProps {}

export default function PageSystemVariableSelect({}: PageSystemVariableSelectProps) {
  return (
    <PageSystemVariableLayout endpoint="SELECT">
      <span>Select</span>
    </PageSystemVariableLayout>
  )
}
