import React from 'react'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'

export interface PageSystemVariableConfigProps {}

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  return (
    <PageSystemVariableLayout endpoint="CONFIG">
      <span>Config</span>
    </PageSystemVariableLayout>
  )
}
