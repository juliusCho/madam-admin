import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartDonut } from '~/components/charts/donut'
import { COUPLE_ACTION_LABEL } from '~/constants/app'
import { COUPLE_ACTION } from '~/enums'
import adminGlobalStates from '~/states/admin'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function CoupleStatusChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(COUPLE_ACTION).map((status) => ({
      status,
      label: COUPLE_ACTION_LABEL[status],
      count: 0,
    })),
  )

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    const subscription = apiDashboard
      .apiCoupleStatus$()
      .subscribe((fetchedData) => {
        setData(() => fetchedData)
      })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiCoupleStatus$])

  return (
    <ChartDonut
      title="소개팅 액션별 비율"
      data={(
        [['상태', '수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      centerText={[
        { text: '전체 소개팅 건수' },
        {
          text: `총 [${helpers.convertToMoneyFormat(
            data.map((datum) => datum.count).reduce((a, b) => a + b) / 2,
          )}]건`,
          bold: true,
        },
      ]}
      className={className}
      colors={['yellow', 'green', 'blue', 'purple', 'red', 'orange', 'pink']}
    />
  )
}

export default React.memo(CoupleStatusChart)
