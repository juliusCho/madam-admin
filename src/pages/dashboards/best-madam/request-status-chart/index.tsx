import moment from 'moment'
import React from 'react'
import { apiDashboard } from '~/api'
import { ChartDonut } from '~/components/charts/donut'
import { MADAM_REQUEST_STATUS_LABEL } from '~/constants/etc'
import { MADAM_REQUEST_STATUS } from '~/types'
import helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'

interface Props {
  token: string
  className: string
}

function RequestStatusChart({ token, className }: Props) {
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

  const isMounted = customHooks.useIsMounted()

  const fetchData = React.useCallback(async () => {
    if (!dateRange || !Array.isArray(dateRange) || dateRange.length === 1)
      return

    const result = await apiDashboard.apiMadamRequestStatusPerWeek(
      token,
      moment(dateRange[0]).format('YYYY-MM-DD'),
      moment(dateRange[1]).format('YYYY-MM-DD'),
    )

    if (!result) {
      setData((oldList) => oldList.map((old) => ({ ...old, count: 0 })))
      return
    }
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
  }, [token, apiDashboard.apiMadamRequestStatusPerWeek, dateRange])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

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
