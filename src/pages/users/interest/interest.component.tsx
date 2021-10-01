import React from 'react'
import PageUserLayout from '~/pages/users/layout.component'

export interface PageUserInterestProps {}

export default function PageUserInterest({}: PageUserInterestProps) {
  return (
    <PageUserLayout endpoint="INTEREST">
      <span>Interest</span>
    </PageUserLayout>
  )
}
