import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '../../../api'
import { ChartDonut } from '../../../components/charts/donut'
import { ChartLine } from '../../../components/charts/line'
import adminGlobalStates from '../../../recoil/admin'
import deviceGlobalStates from '../../../recoil/device'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import PageDashboardLayout from '../layout.component'
import PageDashboardAppUseStyle from './app-use.style'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
helpers.setToEndDate(yesterday)

const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)
helpers.setToStartDate(lastWeek)

const lastMonth = new Date()
lastMonth.setDate(lastMonth.getDate() - 1)
lastMonth.setMonth(lastMonth.getMonth() - 1)
helpers.setToStartDate(lastMonth)

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
  >([lastWeek, yesterday])
  const [connectChartData, setConnectChartData] = React.useState<
    Array<[string, number, number]>
  >([])
  const [reportChartDate, setReportChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([lastMonth, yesterday])
  const [inviteChartDate, setInviteChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([lastMonth, yesterday])

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

  const onChangeConnectChartDate = (date?: Date | Array<Date | undefined>) => {
    if (!date) {
      setConnectChartDate([lastWeek, yesterday])
      return
    }

    if (!Array.isArray(date) || date.length === 1) {
      setConnectChartDate(date)
      return
    }

    if (moment(date[1]).diff(moment(date[0]), 'days') <= 6) {
      setConnectChartDate(date)
      return
    }

    const endDate = moment(date[0]).toDate()
    endDate.setDate(endDate.getDate() + 6)

    setConnectChartDate([date[0], endDate])
  }

  const fetchLineChartData = React.useCallback(async () => {
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
    )
    if (!result) {
      setConnectChartData(() => [])
      return
    }

    setConnectChartData(() =>
      helpers
        .getDateRangeArray('days', connectChartDate as Date[])
        .map((date) => {
          const found = result.find(
            (res) => res.date === moment(date).format('YYYY-MM-DD'),
          )

          if (found) {
            return [found.date, found.joinCount, found.quitCount]
          }

          return [moment(date).format('YYYY-MM-DD'), 0, 0]
        }),
    )
  }, [token, connectChartDate, helpers.getDateRangeArray])

  React.useEffect(() => {
    if (isMounted()) {
      fetchLineChartData()
    }
  }, [isMounted, fetchLineChartData])

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
            className="mt-5"
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
              type: 'days',
              date: connectChartDate,
              onChange: onChangeConnectChartDate,
              format: 'YYYY-MM-DD',
              maxDate: yesterday,
            }}
            className={PageDashboardAppUseStyle.lineChart({ device })}
          />
        </div>
        <div className={PageDashboardAppUseStyle.row({ device })} />
      </div>
    </PageDashboardLayout>
  )
}
