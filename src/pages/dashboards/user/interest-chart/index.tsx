import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import adminGlobalStates from '~/states/admin'

interface Props {
  isLike: boolean
  className: string
}

function InterestChart({ isLike, className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ id: string; count: number; label: string }>
  >([{ id: '1', label: '', count: 0 }])

  React.useLayoutEffect(() => {
    if (!admin) {
      return () => {}
    }

    const subscription = apiDashboard.apiInterestsCount$(isLike).subscribe({
      next: setData,
      error: () => setData(() => [{ id: '1', label: '', count: 0 }]),
    })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiInterestsCount$, isLike])

  return (
    <ChartDonut
      title={`${isLike ? '관심사 별' : '싫어요 별'} 비율`}
      data={(
        [[isLike ? '관심사' : '싫어요', '사용자 수']] as Array<
          [string, string] | [string, number]
        >
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(InterestChart)
