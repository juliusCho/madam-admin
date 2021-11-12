import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartBar } from '~/components/charts/bar'
import adminGlobalStates from '~/states/admin'

interface Props {
  className: string
}

function CharmPurchaseChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<Array<[string, number]>>([])

  React.useLayoutEffect(() => {
    if (!admin) {
      return () => {}
    }

    const subscription = apiDashboard.apiCharmPurchaseCount$().subscribe({
      next: setData,
      error: () => setData(() => []),
    })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiCharmPurchaseCount$])

  return (
    <ChartBar
      title="포인트 플랜 당 누적 구매 수"
      data={(
        [['포인트명 or 구매가격', '구매 수']] as Array<Array<string | number>>
      ).concat(data)}
      className={className}
    />
  )
}

export default React.memo(CharmPurchaseChart)
