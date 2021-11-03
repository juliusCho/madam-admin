import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartLine } from '~/components/charts/line'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function JoinQuitChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('week')
  const [data, setData] = React.useState<Array<[string, number, number]>>([])

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
      .apiQuitAndJoinCount$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
        rangeOption,
      )
      .subscribe((result) => {
        setData(() =>
          helpers
            .getDateRangeArray(rangeOption, dateRange as Date[])
            .filter(
              (date) =>
                !!result.find(
                  (res) => res.date === moment(date).format(format),
                ),
            )
            .map((date) => {
              const found = result.find(
                (res) => res.date === moment(date).format(format),
              )

              if (found) {
                return [found.date, found.joinCount, found.quitCount]
              }

              return [moment(date).format(format), 0, 0]
            }),
        )
      })

    return () => subscription.unsubscribe()
  }, [
    admin,
    dateRange,
    apiDashboard.apiQuitAndJoinCount$,
    helpers.getDateRangeArray,
    moment,
    format,
    rangeOption,
  ])

  return (
    <ChartLine
      title="신규 가입 / 탈퇴 수"
      data={(
        [
          [
            { type: 'string', label: '일자' },
            { type: 'number', label: '가입 수' },
            { type: 'number', label: '탈퇴 수' },
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
      colors={['blue', 'orange']}
    />
  )
}

export default React.memo(JoinQuitChart)