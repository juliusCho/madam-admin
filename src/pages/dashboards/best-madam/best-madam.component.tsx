import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/api'
import { ChartBarLine } from '~/components/charts/bar-line'
import { ChartDonut } from '~/components/charts/donut'
import { ChartLineByDataset } from '~/components/charts/line-by-dataset'
import { MADAM_REQUEST_STATUS_LABEL } from '~/constants/etc'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import { ChartDatePickerOptionType, MADAM_REQUEST_STATUS } from '~/types'
import helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'
import PageDashboardBestMadamStyle from './best-madam.style'

export interface PageDashboardBestMadamProps {}

export default function PageDashboardBestMadam({}: PageDashboardBestMadamProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [statusChartData, setStatusChartData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(MADAM_REQUEST_STATUS).map((status) => ({
      status,
      label: MADAM_REQUEST_STATUS_LABEL[status],
      count: 0,
    })),
  )
  const [statusChartDate, setStatusChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [requestChartDate, setRequestChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [requestChartDateOption, setRequestChartDateOption] =
    React.useState<ChartDatePickerOptionType>('week')
  const [requestChartData, setRequestChartData] = React.useState<
    Array<[string, number, number, number, number, number]>
  >([])
  const [pointChartData, setPointChartData] = React.useState<{
    isEnd?: boolean
    data: Array<[string, number]>
  }>({ data: [] })
  const [pointChartDataOffset, setPointChartDataOffset] = React.useState(0)
  const [pointChartDataDisplayCount, setPointChartDataDisplayCount] =
    React.useState(4)

  const isMounted = customHooks.useIsMounted()

  const fetchStatusChartData = React.useCallback(async () => {
    if (
      !statusChartDate ||
      !Array.isArray(statusChartDate) ||
      statusChartDate.length === 1
    )
      return

    const result = await apiDashboard.apiMadamRequestStatusPerWeek(
      token,
      moment(statusChartDate[0]).format('YYYY-MM-DD'),
      moment(statusChartDate[1]).format('YYYY-MM-DD'),
    )

    if (!result) {
      setStatusChartData((oldList) =>
        oldList.map((old) => ({ ...old, count: 0 })),
      )
      return
    }
    setStatusChartData((oldList) =>
      oldList.map((old) => {
        const found = Object.keys(result).find((key) => key === old.status)
        if (found) {
          // @ts-ignore
          return { ...old, count: result[found] }
        }
        return { ...old, count: 0 }
      }),
    )
  }, [token, apiDashboard.apiMadamRequestStatusPerWeek, statusChartDate])

  React.useEffect(() => {
    if (isMounted()) {
      fetchStatusChartData()
    }
  }, [isMounted, fetchStatusChartData])

  const onChangeStatusChartDate = (date?: Date | Array<Date | undefined>) => {
    if (!date) return

    helpers.changeChartDate(setStatusChartDate, date, 'week')
  }

  const requestChartMaxDate = React.useMemo(() => {
    switch (requestChartDateOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [requestChartDateOption])

  const requestChartFormat = React.useMemo(() => {
    switch (requestChartDateOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [requestChartDateOption])

  const onChangeRequestChartDate = (
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOptionType,
  ) => {
    if (!date) {
      return
    }

    if (inputOption) {
      setRequestChartDateOption(inputOption)
      helpers.changeChartDate(setRequestChartDate, date, inputOption)
      return
    }

    helpers.changeChartDate(setRequestChartDate, date, requestChartDateOption)
  }

  const fetchRequestChartData = React.useCallback(async () => {
    if (
      !requestChartDate ||
      !Array.isArray(requestChartDate) ||
      requestChartDate.length === 1
    )
      return

    const result = await apiDashboard.apiMadamRequestCount(
      token,
      moment(requestChartDate[0]).format('YYYY-MM-DD'),
      moment(requestChartDate[1]).format('YYYY-MM-DD'),
      requestChartDateOption,
    )
    if (!result) {
      setRequestChartDate(() => [])
      return
    }

    setRequestChartData(() =>
      helpers
        .getDateRangeArray(requestChartDateOption, requestChartDate as Date[])
        .filter(
          (date) =>
            !!result.find(
              (res) => res.date === moment(date).format(requestChartFormat),
            ),
        )
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format(requestChartFormat),
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

          return [moment(date).format(requestChartFormat), 0, 0, 0, 0, 0]
        }),
    )
  }, [
    token,
    requestChartDate,
    helpers.getDateRangeArray,
    requestChartFormat,
    requestChartDateOption,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      fetchRequestChartData()
    }
  }, [isMounted, fetchRequestChartData])

  const onChangePointDisplayCount = (count: number) => {
    setPointChartDataOffset(0)
    setPointChartDataDisplayCount(count)
  }

  const onClickPointChartPrevNext = (type: 'prev' | 'next') => {
    setPointChartDataOffset((old) =>
      type === 'prev'
        ? old - pointChartDataDisplayCount
        : old + pointChartDataDisplayCount,
    )
  }

  const fetchPointChartData = React.useCallback(async () => {
    const result = await apiDashboard.apiPointsPerMadam(
      token,
      pointChartDataOffset,
      pointChartDataDisplayCount,
    )
    if (!result) {
      setPointChartData(() => ({ data: [] }))
      return
    }

    setPointChartData(() => ({
      isEnd: result.isEnd,
      data: result.data.map((datum) => [datum.madam, datum.point]),
    }))
  }, [pointChartDataDisplayCount, pointChartDataOffset])

  React.useEffect(() => {
    if (isMounted()) {
      fetchPointChartData()
    }
  }, [isMounted, fetchPointChartData])

  return (
    <PageDashboardLayout endpoint="BEST_MADAM">
      <div className={PageDashboardBestMadamStyle.container({ device })}>
        <div className={PageDashboardBestMadamStyle.row({ device })}>
          <ChartLineByDataset
            title="최고의 마담별 포인트 수"
            data={(
              [
                [
                  { type: 'string', label: '당선일자' },
                  { type: 'number', label: '포인트' },
                ],
              ] as Array<Array<Record<string, string>> | Array<string | number>>
            ).concat(pointChartData.data)}
            displayCounts={[4, 10, 20, 30]}
            onChangeDisplayDataCount={onChangePointDisplayCount}
            prev={{
              onClick: () => onClickPointChartPrevNext('prev'),
              disabled: pointChartData.isEnd,
            }}
            next={{
              onClick: () => onClickPointChartPrevNext('next'),
              disabled: pointChartDataOffset === 0,
            }}
            className={PageDashboardBestMadamStyle.chart({ device })}
            colors={['pink']}
          />
          <ChartBarLine
            title="소개팅 요청별 의뢰 상태"
            data={(
              [
                ['날짜'].concat(Object.values(MADAM_REQUEST_STATUS_LABEL)),
              ] as Array<Array<string | number>>
            ).concat(requestChartData)}
            dateSearch={{
              type: requestChartDateOption,
              date: requestChartDate,
              onChange: onChangeRequestChartDate,
              format: requestChartFormat,
              maxDate: requestChartMaxDate,
            }}
            lineColumnIdx={0}
            className={PageDashboardBestMadamStyle.chart({ device })}
            colors={['blue', 'purple', 'orange', 'green', 'red']}
          />
          <ChartDonut
            title="주별 소개팅 의뢰상태별 비율"
            data={(
              [['의뢰 상태', '개수']] as Array<
                [string, string] | [string, number]
              >
            ).concat(
              statusChartData.map((statusChartDatum) => [
                statusChartDatum.label,
                statusChartDatum.count,
              ]),
            )}
            centerText={[
              { text: '총 의뢰 수' },
              {
                text: `[${helpers.convertToMoneyFormat(
                  statusChartData
                    .map((datum) => datum.count)
                    .reduce((a, b) => a + b),
                )}]건`,
                bold: true,
              },
            ]}
            className={PageDashboardBestMadamStyle.chart({ device })}
            colors={['blue', 'purple', 'orange', 'green', 'red']}
            dateSearch={{
              type: 'week',
              date: statusChartDate,
              onChange: onChangeStatusChartDate,
              format: 'YYYY-MM-DD',
              maxDate: helpers.getYesterday(),
            }}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
