import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import { GENDER_LABEL } from '~/constants/app'
import { GENDER } from '~/enums'
import adminGlobalStates from '~/states/admin'

interface Props {
  className: string
}

function GenderChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(GENDER).map((status) => ({
      status,
      label: GENDER_LABEL[status],
      count: 0,
    })),
  )

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    const subscription = apiDashboard
      .apiUserCountPerGender$()
      .subscribe((result) => {
        setData(() => result)
      })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiUserCountPerGender$])

  return (
    <ChartDonut
      title="사용자 남/여 비율"
      data={(
        [['성별', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
      colors={['blue', 'red']}
    />
  )
}

export default React.memo(GenderChart)
