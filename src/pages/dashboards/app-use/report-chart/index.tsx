import moment from 'moment'
import React from 'react'
import apiDashboard from '~/apis/dashboard'
import { ChartLine } from '~/components/charts/line'
import { ChartDatePickerOptionType } from '~/enums'
import helpers from '~/utils/helpers'

interface Props {
  className: string
}

function ReportChart({ className }: Props) {
  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousThreeMonth(), helpers.getLastMonth()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('3-months')
  const [data, setData] = React.useState<Array<[string, number]>>([])

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

  React.useEffect(() => {
    if (!dateRange || !Array.isArray(dateRange) || dateRange.length === 1)
      return () => {}

    const subscription = apiDashboard
      .apiReportCount$(
        moment(dateRange[0]).format('YYYY-MM-DD'),
        moment(dateRange[1]).format('YYYY-MM-DD'),
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
                return [found.date, found.count]
              }

              return [moment(date).format(format), 0]
            }),
        )
      })

    return () => subscription.unsubscribe()
  }, [
    dateRange,
    helpers.getDateRangeArray,
    apiDashboard.apiReportCount$,
    moment,
    format,
    rangeOption,
  ])

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
