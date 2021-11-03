import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function CountryChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [data, setData] = React.useState<
    Array<{ code: string; label: string; count: number }>
  >([])

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    const subscription = apiDashboard.apiCountryCount$().subscribe((result) => {
      setData(() =>
        device === 'mobile' || device === 'smallScreen'
          ? result.map((item) => ({
              ...item,
              label: helpers.getFlagEmoji(item.code),
            }))
          : result,
      )
    })

    return () => subscription.unsubscribe()
  }, [admin, device, apiDashboard.apiCountryCount$, helpers.getFlagEmoji])

  return (
    <ChartDonut
      title="국가 비율"
      data={(
        [['국가', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(CountryChart)
