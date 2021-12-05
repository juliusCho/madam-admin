import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartLine } from '~/components/charts/line'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import * as helpers from '~/utils/helpers'
import { useMaxDateAndFormat } from '../../shared'

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
      .apiQuitAndJoinCount$(
        moment(dateRange[0]).toDate(),
        moment(dateRange[1]).toDate(),
        rangeOption,
      )
      .subscribe({
        next: setData,
        error: () => setData(() => []),
      })

    return () => subscription.unsubscribe()
  }, [admin, dateRange, apiDashboard.apiQuitAndJoinCount$, moment, rangeOption])

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
