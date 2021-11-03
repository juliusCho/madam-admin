import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import { SEXUAL_PREFERENCE_LABEL } from '~/constants/app'
import { SEXUAL_PREFERENCE } from '~/enums'
import adminGlobalStates from '~/states/admin'

interface Props {
  className: string
}

function GenderPreferChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(SEXUAL_PREFERENCE).map((status) => ({
      status,
      label: SEXUAL_PREFERENCE_LABEL[status],
      count: 0,
    })),
  )

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    const subscription = apiDashboard
      .apiUserCountPerSexualPreference$()
      .subscribe((result) => {
        setData((oldList) =>
          oldList.map((old) => {
            const found = Object.keys(result).find((key) => key === old.status)
            if (found) {
              // @ts-ignore
              return { ...old, count: result[found] }
            }
            return { ...old, count: 0 }
          }),
        )
      })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiUserCountPerSexualPreference$])

  return (
    <ChartDonut
      title="이성/동성/양성애자 비율"
      data={(
        [['성 정체성', '사용자 수']] as Array<
          [string, string] | [string, number]
        >
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
      colors={['green', 'orange', 'purple']}
    />
  )
}

export default React.memo(GenderPreferChart)
