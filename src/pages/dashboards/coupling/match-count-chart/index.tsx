import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartBarLine } from '~/components/charts/bar-line'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import * as helpers from '~/utils/helpers'
import { useMaxDateAndFormat } from '../../shared'

interface Props {
  className: string
}

function MatchCountChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousSevenMonth(), helpers.getLastMonth()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('6-months')
  const [data, setData] = React.useState<Array<[string, number, number]>>([])

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
      .apiMatchPerCouplingCount$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
        rangeOption,
      )
      .subscribe({
        next: setData,
        error: () => setData(() => []),
      })

    return () => subscription.unsubscribe()
  }, [
    admin,
    dateRange,
    rangeOption,
    apiDashboard.apiMatchPerCouplingCount$,
    moment,
  ])

  return (
    <ChartBarLine
      title="소개팅 횟수 대비 매칭 수"
      data={(
        [['날짜', '소개팅', '매칭']] as Array<Array<string | number>>
      ).concat(data)}
      dateSearch={{
        type: rangeOption,
        date: dateRange,
        onChange: onChangeDate,
        format,
        maxDate,
      }}
      lineColumnIdx={1}
      className={className}
      colors={['yellow', 'pink']}
    />
  )
}

export default React.memo(MatchCountChart)
