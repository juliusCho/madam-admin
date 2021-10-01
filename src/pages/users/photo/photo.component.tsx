import React from 'react'
import PageUserLayout from '~/pages/users/layout.component'

export interface PageUserPhotoProps {}

export default function PageUserPhoto({}: PageUserPhotoProps) {
  return (
    <PageUserLayout endpoint="PHOTO">
      <span>Photo</span>
    </PageUserLayout>
  )
}
