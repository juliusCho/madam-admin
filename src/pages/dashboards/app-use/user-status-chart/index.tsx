import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartDonut } from '~/components/charts/donut'
import { USER_STATUS_LABEL } from '~/constants/app'
import { USER_STATUS } from '~/enums'
import adminGlobalStates from '~/states/admin'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function UserStatusChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(USER_STATUS).map((status) => ({
      status,
      label: USER_STATUS_LABEL[status],
      count: 0,
    })),
  )

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    const subscription = apiDashboard
      .apiUserCountPerStatus$()
      .subscribe((fetchedData) => {
        setData((oldList) =>
          oldList.map((old) => {
            const found = Object.keys(fetchedData).find(
              (key) => key === old.status,
            )
            if (found) {
              // @ts-ignore
              return { ...old, count: fetchedData[found] }
            }
            return { ...old, count: 0 }
          }),
        )
      })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiUserCountPerStatus$])

  return (
    <ChartDonut
      title="사용자 상태별 비율"
      data={(
        [['사용자 상태', '사용자 수']] as Array<
          [string, string] | [string, number]
        >
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      centerText={[
        { text: '전체 사용자' },
        {
          text: `총 [${helpers.convertToMoneyFormat(
            data.map((datum) => datum.count).reduce((a, b) => a + b),
          )}]명`,
          bold: true,
        },
      ]}
      className={className}
      colors={['purple', 'blue', 'red', 'orange', 'green']}
    />
  )
}

export default React.memo(UserStatusChart)
