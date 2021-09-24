import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '../../../api'
import { ChartBarLine } from '../../../components/charts/bar-line'
import { ChartDonut } from '../../../components/charts/donut'
import { ChartLine } from '../../../components/charts/line'
import adminGlobalStates from '../../../recoil/admin'
import deviceGlobalStates from '../../../recoil/device'
import { ChartDatePickerOption } from '../../../types'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import PageDashboardLayout from '../layout.component'
import PageDashboardAppUseStyle from './app-use.style'

export interface PageDashboardAppUseProps {}

export default function PageDashboardAppUse({}: PageDashboardAppUseProps) {
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [pieChartData, setPieChartData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >([
    {
      status: 'REST',
      label: '휴면',
      count: 0,
    },
    {
      status: 'ACTIVE',
      label: '활성',
      count: 0,
    },
    {
      status: 'BAN',
      label: '정지',
      count: 0,
    },
    {
      status: 'QUIT',
      label: '탈퇴',
      count: 0,
    },
    {
      status: 'INACTIVE',
      label: '비활성',
      count: 0,
    },
  ])
  const [connectChartDate, setConnectChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getLastWeek(), helpers.getYesterday()])
  const [connectChartDateOption, setConnectChartDateOption] =
    React.useState<ChartDatePickerOption>('week')
  const [connectChartData, setConnectChartData] = React.useState<
    Array<[string, number, number]>
  >([])
  const [reportChartDate, setReportChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousThreeMonth(), helpers.getLastMonth()])
  const [reportChartDateOption, setReportChartDateOption] =
    React.useState<ChartDatePickerOption>('3-months')
  const [reportChartData, setReportChartData] = React.useState<
    Array<[string, number]>
  >([])
  const [inviteChartDate, setInviteChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousSevenMonth(), helpers.getLastMonth()])
  const [inviteChartDateOption, setInviteChartDateOption] =
    React.useState<ChartDatePickerOption>('6-months')
  const [inviteChartData, setInviteChartData] = React.useState<
    Array<[string, number, number]>
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchPieChartData = React.useCallback(async () => {
    const result = await apiDashboard.apiUserCountPerStatus(token)

    if (!result) {
      setPieChartData((oldList) => oldList.map((old) => ({ ...old, count: 0 })))
      return
    }
    setPieChartData((oldList) =>
      oldList.map((old) => {
        const found = Object.keys(result).find((key) => key === old.status)
        if (found) {
          // @ts-ignore
          return { ...old, count: result[found] }
        }
        return { ...old, count: 0 }
      }),
    )
  }, [token, apiDashboard.apiUserCountPerStatus])

  React.useEffect(() => {
    if (isMounted()) {
      fetchPieChartData()
    }
  }, [isMounted, fetchPieChartData])

  const connectChartMaxDate = React.useMemo(() => {
    switch (connectChartDateOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [connectChartDateOption])

  const connectChartFormat = React.useMemo(() => {
    switch (connectChartDateOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [connectChartDateOption])

  const onChangeConnectChartDate = (
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOption,
  ) => {
    if (!date) {
      return
    }

    if (inputOption) {
      setConnectChartDateOption(inputOption)
      helpers.changeChartDate(setConnectChartDate, date, inputOption)
      return
    }

    helpers.changeChartDate(setConnectChartDate, date, connectChartDateOption)
  }

  const reportChartMaxDate = React.useMemo(() => {
    switch (reportChartDateOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [reportChartDateOption])

  const reportChartFormat = React.useMemo(() => {
    switch (reportChartDateOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [reportChartDateOption])

  const onChangeReportChartDate = (
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOption,
  ) => {
    if (!date) {
      return
    }

    if (inputOption) {
      setReportChartDateOption(inputOption)
      helpers.changeChartDate(setReportChartDate, date, inputOption)
      return
    }

    helpers.changeChartDate(setReportChartDate, date, reportChartDateOption)
  }

  const inviteChartMaxDate = React.useMemo(() => {
    switch (inviteChartDateOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [inviteChartDateOption])

  const inviteChartFormat = React.useMemo(() => {
    switch (inviteChartDateOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [inviteChartDateOption])

  const onChangeInviteChartDate = (
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOption,
  ) => {
    if (!date) {
      return
    }

    if (inputOption) {
      setInviteChartDateOption(inputOption)
      helpers.changeChartDate(setInviteChartDate, date, inputOption)
      return
    }

    helpers.changeChartDate(setInviteChartDate, date, inviteChartDateOption)
  }

  const fetchConnectChartData = React.useCallback(async () => {
    if (
      !connectChartDate ||
      !Array.isArray(connectChartDate) ||
      connectChartDate.length === 1
    )
      return

    const result = await apiDashboard.apiQuitAndJoinCount(
      token,
      moment(connectChartDate[0]).format('YYYY-MM-DD'),
      moment(connectChartDate[1]).format('YYYY-MM-DD'),
      connectChartDateOption,
    )
    if (!result) {
      setConnectChartData(() => [])
      return
    }

    setConnectChartData(() =>
      helpers
        .getDateRangeArray(connectChartDateOption, connectChartDate as Date[])
        .filter(
          (date) =>
            !!result.find(
              (res) => res.date === moment(date).format(connectChartFormat),
            ),
        )
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format(connectChartFormat),
          )

          if (found) {
            return [found.date, found.joinCount, found.quitCount]
          }

          return [moment(date).format(connectChartFormat), 0, 0]
        }),
    )
  }, [
    token,
    connectChartDate,
    helpers.getDateRangeArray,
    connectChartFormat,
    connectChartDateOption,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      fetchConnectChartData()
    }
  }, [isMounted, fetchConnectChartData])

  const fetchReportChartData = React.useCallback(async () => {
    if (
      !reportChartDate ||
      !Array.isArray(reportChartDate) ||
      reportChartDate.length === 1
    )
      return

    const result = await apiDashboard.apiReportCount(
      token,
      moment(reportChartDate[0]).format('YYYY-MM-DD'),
      moment(reportChartDate[1]).format('YYYY-MM-DD'),
      reportChartDateOption,
    )
    if (!result) {
      setReportChartData(() => [])
      return
    }

    setReportChartData(() =>
      helpers
        .getDateRangeArray(reportChartDateOption, reportChartDate as Date[])
        .filter(
          (date) =>
            !!result.find(
              (res) => res.date === moment(date).format(reportChartFormat),
            ),
        )
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format(reportChartFormat),
          )

          if (found) {
            return [found.date, found.count]
          }

          return [moment(date).format(reportChartFormat), 0]
        }),
    )
  }, [
    token,
    reportChartDate,
    helpers.getDateRangeArray,
    reportChartFormat,
    reportChartDateOption,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      fetchReportChartData()
    }
  }, [isMounted, fetchReportChartData])

  const fetchInviteChartData = React.useCallback(async () => {
    if (
      !inviteChartDate ||
      !Array.isArray(inviteChartDate) ||
      inviteChartDate.length === 1
    )
      return

    const result = await apiDashboard.apiSendLinkAndJoinCount(
      token,
      moment(inviteChartDate[0]).format('YYYY-MM-DD'),
      moment(inviteChartDate[1]).format('YYYY-MM-DD'),
      inviteChartDateOption,
    )
    if (!result) {
      setInviteChartData(() => [])
      return
    }

    setInviteChartData(() =>
      helpers
        .getDateRangeArray(inviteChartDateOption, inviteChartDate as Date[])
        .filter(
          (date) =>
            !!result.find(
              (res) => res.date === moment(date).format(inviteChartFormat),
            ),
        )
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format(inviteChartFormat),
          )

          if (found) {
            return [found.date, found.sendCount, found.joinCount]
          }

          return [moment(date).format(inviteChartFormat), 0, 0]
        }),
    )
  }, [
    token,
    inviteChartDate,
    helpers.getDateRangeArray,
    inviteChartFormat,
    inviteChartDateOption,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      fetchInviteChartData()
    }
  }, [isMounted, fetchInviteChartData])

  return (
    <PageDashboardLayout endpoint="APP_USE">
      <div className={PageDashboardAppUseStyle.container({ device })}>
        <div className={PageDashboardAppUseStyle.row({ device })}>
          <ChartDonut
            title="사용자 상태별 비율"
            data={(
              [['사용자 상태', '사용자 수']] as Array<
                [string, string] | [string, number]
              >
            ).concat(
              pieChartData.map((pieChartDatum) => [
                pieChartDatum.label,
                pieChartDatum.count,
              ]),
            )}
            centerText={[
              { text: '전체 사용자' },
              {
                text: `총 [${helpers.convertToMoneyFormat(
                  pieChartData
                    .map((datum) => datum.count)
                    .reduce((a, b) => a + b),
                )}]명`,
                bold: true,
              },
            ]}
            className={`${PageDashboardAppUseStyle.chart({ device })} mt-5`}
            colors={['purple', 'blue', 'red', 'orange', 'green']}
          />
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
            ).concat(connectChartData)}
            dateSearch={{
              type: connectChartDateOption,
              date: connectChartDate,
              onChange: onChangeConnectChartDate,
              format: connectChartFormat,
              maxDate: connectChartMaxDate,
            }}
            className={PageDashboardAppUseStyle.chart({ device })}
            colors={['blue', 'orange']}
          />
        </div>
        <div className={PageDashboardAppUseStyle.row({ device })}>
          <ChartLine
            title="신고 / 차단 수"
            data={(
              [
                [
                  { type: 'string', label: '일자' },
                  { type: 'number', label: '신고/차단 수' },
                ],
              ] as Array<Array<Record<string, string>> | Array<string | number>>
            ).concat(reportChartData)}
            dateSearch={{
              type: reportChartDateOption,
              date: reportChartDate,
              onChange: onChangeReportChartDate,
              format: reportChartFormat,
              maxDate: reportChartMaxDate,
            }}
            className={PageDashboardAppUseStyle.chart({ device })}
            colors={['red']}
          />
          <ChartBarLine
            title="초대 링크 발송 수 대비 링크를 통한 가입 수"
            data={(
              [['날짜', '초대링크 발송', '가입']] as Array<
                Array<string | number>
              >
            ).concat(inviteChartData)}
            dateSearch={{
              type: inviteChartDateOption,
              date: inviteChartDate,
              onChange: onChangeInviteChartDate,
              format: inviteChartFormat,
              maxDate: inviteChartMaxDate,
            }}
            lineColumnIdx={1}
            className={PageDashboardAppUseStyle.chart({ device })}
            colors={['green', 'blue']}
          />
        </div>
      </div>
    </PageDashboardLayout>
  )
}
