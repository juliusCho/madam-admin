import moment from 'moment'
import React from 'react'
import { apiDashboard } from '~/api'
import { ChartBarLine } from '~/components/charts/bar-line'
import { MADAM_REQUEST_STATUS_LABEL } from '~/constants/etc'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'

interface Props {
  token: string
  className: string
}

function RequestCountChart({ token, className }: Props) {
  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('week')
  const [data, setData] = React.useState<
    Array<[string, number, number, number, number, number]>
  >([])

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

    const result = await apiDashboard.apiMadamRequestCount(
      token,
      moment(dateRange[0]).format('YYYY-MM-DD'),
      moment(dateRange[1]).format('YYYY-MM-DD'),
      rangeOption,
    )
    if (!result) {
      setDateRange(() => [])
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
            return [
              found.date,
              found.requestCount,
              found.acceptCount,
              found.rejectCount,
              found.completeCount,
              found.timeoutCount,
            ]
          }

          return [moment(date).format(format), 0, 0, 0, 0, 0]
        }),
    )
  }, [token, dateRange, helpers.getDateRangeArray, format, rangeOption])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartBarLine
      title="소개팅 요청별 의뢰 상태"
      data={(
        [['날짜'].concat(Object.values(MADAM_REQUEST_STATUS_LABEL))] as Array<
          Array<string | number>
        >
      ).concat(data)}
      dateSearch={{
        type: rangeOption,
        date: dateRange,
        onChange: onChangeDate,
        format,
        maxDate,
      }}
      lineColumnIdx={0}
      className={className}
      colors={['blue', 'purple', 'orange', 'green', 'red']}
    />
  )
}

export default React.memo(RequestCountChart)
