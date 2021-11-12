import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartLine } from '~/components/charts/line'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'
import { useMaxDateAndFormat } from '../../shared'

interface Props {
  className: string
}

function ReportChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousThreeMonth(), helpers.getLastMonth()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('3-months')
  const [data, setData] = React.useState<Array<[string, number]>>([])

  const { maxDate, format } = useMaxDateAndFormat(rangeOption)

  const onChangeDate = React.useCallback(
    (
      date?: Date | Array<Date | undefined>,
      inputOption?: ChartDatePickerOptionType,
    ) => {
      if (!date) {
        return
      }

      if (inputOption) {
        setRangeOption(() => inputOption)
        helpers.changeChartDate(setDateRange, date, inputOption)
        return
      }

      helpers.changeChartDate(setDateRange, date, rangeOption)
    },
    [helpers.changeChartDate],
  )

  React.useLayoutEffect(() => {
    if (
      !admin ||
      !dateRange ||
      !Array.isArray(dateRange) ||
      dateRange.length === 1
    )
      return () => {}

    const subscription = apiDashboard
      .apiReportCount$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
        rangeOption,
      )
      .subscribe({
        next: setData,
        error: () => setData(() => []),
      })

    return () => subscription.unsubscribe()
  }, [admin, dateRange, apiDashboard.apiReportCount$, moment, rangeOption])

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
