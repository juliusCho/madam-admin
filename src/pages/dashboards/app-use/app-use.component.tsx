import React from 'react'
import Recoil from 'recoil'
import userGlobalStates from '../../../recoil/user'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({}: PageDashboardAppUseProps) {
  const user = Recoil.useRecoilValue(userGlobalStates.userState)

  return (
    <div>
      <span>WELCOME, {user?.name}!</span>
    </div>
  )
}
