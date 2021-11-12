import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import { MADAM_REQUEST_STATUS_LABEL } from '~/constants/app'
import { MADAM_REQUEST_STATUS } from '~/enums'
import adminGlobalStates from '~/states/admin'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function RequestStatusChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(MADAM_REQUEST_STATUS).map((status) => ({
      status,
      label: MADAM_REQUEST_STATUS_LABEL[status],
      count: 0,
    })),
  )
  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])

  React.useLayoutEffect(() => {
    if (
      !admin ||
      !dateRange ||
      !Array.isArray(dateRange) ||
      dateRange.length === 1
    )
      return () => {}

    const subscription = apiDashboard
      .apiMadamRequestStatusPerWeek$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
      )
      .subscribe({
        next: setData,
        error: () =>
          setData((oldList) => oldList.map((old) => ({ ...old, count: 0 }))),
      })

    return () => subscription.unsubscribe()
  }, [admin, apiDashboard.apiMadamRequestStatusPerWeek$, dateRange])

  const onChangeDate = (date?: Date | Array<Date | undefined>) => {
    if (!date) return

    helpers.changeChartDate(setDateRange, date, 'week')
  }

  return (
    <ChartDonut
      title="주별 소개팅 의뢰상태별 비율"
      data={(
        [['의뢰 상태', '개수']] as Array<[string, string] | [string, number]>
      ).concat(
        data.map((statusChartDatum) => [
          statusChartDatum.label,
          statusChartDatum.count,
        ]),
      )}
      centerText={[
        { text: '총 의뢰 수' },
        {
          text: `[${helpers.convertToMoneyFormat(
            data.map((datum) => datum.count).reduce((a, b) => a + b),
          )}]건`,
          bold: true,
        },
      ]}
      className={className}
      colors={['blue', 'purple', 'orange', 'green', 'red']}
      dateSearch={{
        type: 'week',
        date: dateRange,
        onChange: onChangeDate,
        format: 'YYYY-MM-DD',
        maxDate: helpers.getYesterday(),
      }}
    />
  )
}

export default React.memo(RequestStatusChart)
