import moment from 'moment'
import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import { apiDashboard } from '../../../api'
import { Loading } from '../../../components/etc/loading'
import { InputDateTime } from '../../../components/inputs/date-time'
import adminGlobalStates from '../../../recoil/admin'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import PageDashboardLayout from '../layout.component'
import PageDashboardLayoutStyle from '../layout.style'
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

  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())
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

  customHooks.useCheckMobile(setIsMobile, 1080)

  const isMounted = customHooks.useIsMounted()
  const forceUpdate = customHooks.useForceUpdate()

  React.useEffect(() => {
    if (isMounted() && isMobile) {
      forceUpdate()
    }
  }, [isMounted, isMobile])

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
      <div
        className={PageDashboardAppUseStyle.container}
        style={{ marginTop: isMobile ? '2rem' : undefined }}>
        <div
          className={PageDashboardAppUseStyle.row}
          style={
            isMobile
              ? {
                  flexDirection: 'column',
                  marginTop: '2rem',
                }
              : {
                  flexDirection: 'row',
                }
          }>
          <div
            className={PageDashboardAppUseStyle.pieChartLabel}
            style={
              isMobile
                ? { top: '11rem', left: 'calc(50% - 1.5rem)' }
                : {
                    marginTop: '3.5rem',
                    left: 'calc(50% - 24.5rem)',
                  }
            }>
            <span
              className={
                isMobile
                  ? 'text-subSmall font-subSmall text-mono-darkGray'
                  : 'text-subTitleMedium font-subTitleMedium text-mono-darkGray'
              }>
              전체 사용자
            </span>
            <span
              className={`mt-2 ${
                isMobile
                  ? 'text-subMedium font-subMedium text-mono-black'
                  : 'text-subTitleBig font-subTitleBig text-mono-black'
              }`}>
              {`총 [${helpers.convertToMoneyFormat(
                pieChartData
                  .map((datum) => datum.count)
                  .reduce((a, b) => a + b),
              )}]명`}
            </span>
          </div>
          <div
            className={PageDashboardAppUseStyle.chart({ isMobile })}
            style={{ marginRight: isMobile ? undefined : '10rem' }}>
            <span className={PageDashboardAppUseStyle.chartLabel({ isMobile })}>
              사용자 상태별 비율
            </span>
            <Chart
              width={isMobile ? 350 : 500}
              height={isMobile ? 300 : 420}
              chartType="PieChart"
              loader={<Loading loading />}
              data={(
                [['사용자 상태', '사용자 수']] as Array<Array<string | number>>
              ).concat(
                pieChartData.map((pieChartDatum) => [
                  pieChartDatum.label,
                  pieChartDatum.count,
                ]),
              )}
              options={{
                pieSliceTextStyle: {
                  fontSize: isMobile ? 8 : 16,
                },
                pieHole: 0.6,
                backgroundColor: 'transparent',
                chartArea: {
                  left: 50,
                  top: 70,
                  right: 50,
                  bottom: 20,
                },
                legend: {
                  alignment: 'center',
                  position: 'top',
                  textStyle: {
                    fontSize: isMobile ? 8 : 16,
                  },
                },
                pieSliceBorderColor: 'white',
                sliceVisibilityThreshold: 0,
              }}
            />
          </div>
          <div
            className={PageDashboardAppUseStyle.chart({ isMobile })}
            style={{ marginTop: isMobile ? '2rem' : undefined }}>
            <span className={PageDashboardAppUseStyle.chartLabel({ isMobile })}>
              신규 가입 / 탈퇴 수
            </span>
            <div className={PageDashboardAppUseStyle.chartDate}>
              <InputDateTime
                onChange={onChangeConnectChartDate}
                date={connectChartDate}
                format="YYYY-MM-DD"
                range
                maxDate={yesterday}
                {...PageDashboardLayoutStyle.inputDateTimeStyleProps}
              />
            </div>
            <Chart
              width={isMobile ? 400 : 550}
              height={isMobile ? 300 : 350}
              chartType="LineChart"
              loader={<Loading loading />}
              data={(
                [
                  [
                    { type: 'string', label: '일자' },
                    { type: 'number', label: '가입 수' },
                    { type: 'number', label: '탈퇴 수' },
                  ],
                ] as Array<Array<any>>
              ).concat(connectChartData)}
              options={{
                backgroundColor: 'transparent',
                chartArea: {
                  left: 70,
                  top: 70,
                  right: 20,
                  bottom: 50,
                },
                legend: {
                  alignment: 'center',
                  position: 'top',
                  textStyle: {
                    fontSize: isMobile ? 8 : 16,
                  },
                },
                animation: {
                  startup: true,
                  duration: 200,
                  easing: 'inAndOut',
                },
                explorer: {
                  actions: ['dragToPan', 'rightClickToReset'],
                  axis: 'horizontal',
                  keepInBounds: true,
                },
                pointSize: 6,
                lineWidth: 3,
              }}
            />
          </div>
        </div>
        <div
          className={PageDashboardAppUseStyle.row}
          style={{
            flexDirection: isMobile ? 'column' : 'row',
            marginTop: isMobile ? '2rem' : undefined,
          }}
        />
      </div>
    </PageDashboardLayout>
  )
}
