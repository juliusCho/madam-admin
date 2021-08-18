import React from 'react'
import PageUserLayout from '../layout.component'

export interface PageUserBlockProps {}

export default function PageUserBlock({}: PageUserBlockProps) {
  return (
    <PageUserLayout endpoint="BLOCK">
      <div />
    </PageUserLayout>
  )
}
