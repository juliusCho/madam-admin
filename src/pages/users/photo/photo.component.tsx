import React from 'react'
import PageUserLayout from '../layout.component'

export interface PageUserPhotoProps {}

export default function PageUserPhoto({}: PageUserPhotoProps) {
  return (
    <PageUserLayout endpoint="PHOTO">
      <div />
    </PageUserLayout>
  )
}
