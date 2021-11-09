import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import adminGlobalStates from '~/states/admin'

interface Props {
  id: string
  title: string
  className: string
}

function DynamicChart({ id, title, className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ count: number; label: string }>
  >([])

  React.useLayoutEffect(() => {
    if (!admin) {
      return () => {}
    }

    const subscription = apiDashboard
      .apiDynamicProfileItemCount$(id)
      .subscribe((result) => {
        if (!result) {
          setData(() => [])
          return
        }

        setData(() => result)
      })

    return () => subscription.unsubscribe()
  }, [admin, id, apiDashboard.apiDynamicProfileItemCount$])

  return (
    <ChartDonut
      title={`${title} 별 비율`}
      data={(
        [['항목', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(DynamicChart)
