import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import apiDashboard from '~/apis/dashboard'
import { ChartBar } from '~/components/charts/bar'
import { INQUIRY_TYPE_LABEL } from '~/constants/app'
import adminGlobalStates from '~/states/admin'
import { ChartDatePickerOptionType } from '~/types'
import * as helpers from '~/utils/helpers'
import { useMaxDateAndFormat } from '../../shared'

interface Props {
  className: string
}

function InquiryCountChart({ className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [dateRange, setDateRange] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousSevenMonth(), helpers.getLastMonth()])
  const [rangeOption, setRangeOption] =
    React.useState<ChartDatePickerOptionType>('6-months')
  const [data, setData] = React.useState<
    Array<[string, number, number, number]>
  >([])

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
      .apiCountPerInquiryType$(
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
    apiDashboard.apiCountPerInquiryType$,
    moment,
  ])

  return (
    <ChartBar
      title="유형별 문의글 개수"
      data={(
        [
          [
            '날짜',
            INQUIRY_TYPE_LABEL.INQUIRY,
            INQUIRY_TYPE_LABEL.REQUEST,
            INQUIRY_TYPE_LABEL.ETC,
          ],
        ] as Array<Array<string | number>>
      ).concat(data)}
      dateSearch={{
        type: rangeOption,
        date: dateRange,
        onChange: onChangeDate,
        format,
        maxDate,
      }}
      className={className}
      colors={['yellow', 'pink', 'lightGreen']}
    />
  )
}

export default React.memo(InquiryCountChart)
