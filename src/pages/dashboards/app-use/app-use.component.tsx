import moment from 'moment'
import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import api from '../../../api/dashboard'
import { Loading } from '../../../components/etc/loading'
import { InputDateTime } from '../../../components/inputs/date-time'
import adminGlobalStates from '../../../recoil/admin'
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
  const [reportChartDate, setReportChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([lastMonth, yesterday])
  const [inviteChartDate, setInviteChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([lastMonth, yesterday])

  customHooks.useCheckMobile(setIsMobile, 1080)

  const isMounted = customHooks.useIsMounted()

  const fetchPieChartData = React.useCallback(async () => {
    const result = await api.apiUserCountPerStatus(token)

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
  }, [token])

  React.useEffect(() => {
    if (isMounted()) {
      fetchPieChartData()
    }
  }, [isMounted, fetchPieChartData])

  const getConnectChartMinDate = React.useCallback(() => {
    if (!connectChartDate) {
      return undefined
    }

    if (!Array.isArray(connectChartDate) || connectChartDate.length === 1) {
      return undefined
    }

    const newLastWeek = moment(connectChartDate[1]).toDate()
    newLastWeek.setDate(newLastWeek.getDate() - 6)
    helpers.setToEndDate(newLastWeek)

    return newLastWeek
  }, [connectChartDate, helpers.setToEndDate])

  return (
    <PageDashboardLayout endpoint="APP_USE">
      <div className={PageDashboardAppUseStyle.container}>
        <div
          className={PageDashboardAppUseStyle.row}
          style={{ flexDirection: isMobile ? 'column' : 'row' }}>
          <div className={PageDashboardAppUseStyle.pieChartLabel}>
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
          <div className={PageDashboardAppUseStyle.chart}>
            <span className={PageDashboardAppUseStyle.chartLabel({ isMobile })}>
              사용자 상태별 비율
            </span>
            <Chart
              width={isMobile ? 350 : 550}
              height={isMobile ? 300 : 450}
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
          <div className={PageDashboardAppUseStyle.chart}>
            <span className={PageDashboardAppUseStyle.chartLabel({ isMobile })}>
              탈퇴 / 접속 수
            </span>
            <div className="mt-4 mr-10 self-end">
              <InputDateTime
                onChange={(date) => setConnectChartDate(date)}
                date={connectChartDate}
                format="YYYY-MM-DD HH"
                range
                maxDate={yesterday}
                minDate={getConnectChartMinDate()}
              />
            </div>
            <Chart
              width={isMobile ? 350 : 550}
              height={isMobile ? 300 : 450}
              chartType="LineChart"
              loader={<Loading loading />}
              data={[
                [
                  { type: 'string', label: '일자' },
                  { type: 'number', label: '탈퇴 수' },
                ],
                ['2021-08-31', 100],
                ['2021-09-01', 3],
                ['2021-09-02', 26],
                ['2021-09-03', 42],
                ['2021-09-04', 52],
                ['2021-09-05', 3],
                ['2021-09-06', 1],
              ]}
              options={{
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
              }}
            />
          </div>
        </div>
        <div
          className={PageDashboardAppUseStyle.row}
          style={{ flexDirection: isMobile ? 'column' : 'row' }}
        />
      </div>
    </PageDashboardLayout>
  )
}
