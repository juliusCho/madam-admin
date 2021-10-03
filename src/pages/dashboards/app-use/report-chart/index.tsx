import moment from 'moment'
import React from 'react'
import apiDashboard from '~/api/dashboard'
import { ChartLine } from '~/components/charts/line'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'

interface Props {
  token: string
  className: string
}

function ReportChart({ token, className }: Props) {
  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousThreeMonth(), helpers.getLastMonth()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('3-months')
  const [data, setData] = React.useState<Array<[string, number]>>([])

  const isMounted = customHooks.useIsMounted()

  const maxDate = React.useMemo(() => {
    switch (rangeOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [rangeOption])

  const format = React.useMemo(() => {
    switch (rangeOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [rangeOption])

  const onChangeDate = (
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOptionType,
  ) => {
    if (!date) {
      return
    }

    if (inputOption) {
      setRangeOption(inputOption)
      helpers.changeChartDate(setDateRange, date, inputOption)
      return
    }

    helpers.changeChartDate(setDateRange, date, rangeOption)
  }

  const fetchData = React.useCallback(async () => {
    if (!dateRange || !Array.isArray(dateRange) || dateRange.length === 1)
      return

    const result = await apiDashboard.apiReportCount(
      token,
      moment(dateRange[0]).format('YYYY-MM-DD'),
      moment(dateRange[1]).format('YYYY-MM-DD'),
      rangeOption,
    )
    if (!result) {
      setData(() => [])
      return
    }

    setData(() =>
      helpers
        .getDateRangeArray(rangeOption, dateRange as Date[])
        .filter(
          (date) =>
            !!result.find((res) => res.date === moment(date).format(format)),
        )
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format(format),
          )

          if (found) {
            return [found.date, found.count]
          }

          return [moment(date).format(format), 0]
        }),
    )
  }, [token, dateRange, helpers.getDateRangeArray, format, rangeOption])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartLine
      title="신고 / 차단 수"
      data={(
        [
          [
            { type: 'string', label: '일자' },
            { type: 'number', label: '신고/차단 수' },
          ],
        ] as Array<Array<Record<string, string>> | Array<string | number>>
      ).concat(data)}
      dateSearch={{
        type: rangeOption,
        date: dateRange,
        onChange: onChangeDate,
        format,
        maxDate,
      }}
      className={className}
      colors={['red']}
    />
  )
}

export default React.memo(ReportChart)
