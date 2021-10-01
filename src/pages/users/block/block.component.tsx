import React from 'react'
import PageUserLayout from '~/pages/users/layout.component'

export interface PageUserBlockProps {}

export default function PageUserBlock({}: PageUserBlockProps) {
  return (
    <PageUserLayout endpoint="BLOCK">
      <span>Block</span>
    </PageUserLayout>
  )
}
