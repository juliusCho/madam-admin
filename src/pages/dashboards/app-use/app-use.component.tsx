import React from 'react'
import { RouterProps } from 'react-router'
import Recoil from 'recoil'
import userGlobalStates from '../../../recoil/user'
import { ROUTER_PATH } from '../../../types'
import customHooks from '../../../utils/hooks'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({
  history,
}: PageDashboardAppUseProps & RouterProps) {
  const user = Recoil.useRecoilValue(userGlobalStates.userState)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    if (user === null) {
      history.push(ROUTER_PATH.LOGIN)
    }
  }, [isMounted, user])

  return (
    <div>
      <span>WELCOME, {user?.name}!</span>
    </div>
  )
}
