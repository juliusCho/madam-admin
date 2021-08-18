import React from 'react'
import PageSystemVariableLayout from '../layout.component'

export interface PageSystemVariableConfigProps {}

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  return (
    <PageSystemVariableLayout endpoint="CONFIG">
      <div />
    </PageSystemVariableLayout>
  )
}
