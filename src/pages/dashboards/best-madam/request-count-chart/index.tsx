import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartBarLine } from '~/components/charts/bar-line'
import { MADAM_REQUEST_STATUS_LABEL } from '~/constants/app'
import { MADAM_REQUEST_STATUS } from '~/enums'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function RequestCountChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('week')
  const [data, setData] = React.useState<Array<Array<string | number>>>([])

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

  React.useLayoutEffect(() => {
    if (
      !admin ||
      !dateRange ||
      !Array.isArray(dateRange) ||
      dateRange.length === 1
    )
      return () => {}

    const subscription = apiDashboard
      .apiMadamRequestCount$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
        rangeOption,
      )
      .subscribe((result) => {
        setData(() => result)
      })

    return () => subscription.unsubscribe()
  }, [
    admin,
    dateRange,
    helpers.getDateRangeArray,
    format,
    rangeOption,
    apiDashboard.apiMadamRequestCount$,
    MADAM_REQUEST_STATUS,
  ])

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
