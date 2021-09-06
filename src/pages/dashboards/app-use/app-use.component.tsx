import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import api from '../../../api/dashboard'
import { Loading } from '../../../components/etc/loading'
import adminGlobalStates from '../../../recoil/admin'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import PageDashboardLayout from '../layout.component'
import PageDashboardAppUseStyle from './app-use.style'

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

  customHooks.useCheckMobile(setIsMobile)

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

  return (
    <PageDashboardLayout endpoint="APP_USE">
      <div className={PageDashboardAppUseStyle.container}>
        <div className={PageDashboardAppUseStyle.row}>
          <Chart
            width={isMobile ? 350 : 650}
            height={isMobile ? 300 : 550}
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
              title: `사용자 상태별 비율
              (전체: 총 [${pieChartData
                .map((datum) => datum.count)
                .reduce((a, b) => a + b)}]명)`,
              titleTextStyle: {
                bold: true,
                fontSize: isMobile ? 16 : 24,
              },
              pieSliceTextStyle: {
                fontSize: isMobile ? 8 : 16,
              },
              pieHole: 0,
              backgroundColor: 'white',
              chartArea: {
                left: 50,
                top: 100,
                right: 50,
                bottom: 20,
              },
              legend: {
                alignment: 'center',
                position: 'left',
                textStyle: {
                  fontSize: isMobile ? 8 : 20,
                },
              },
              pieSliceBorderColor: 'white',
              sliceVisibilityThreshold: 0,
            }}
            className={PageDashboardAppUseStyle.chart}
          />
        </div>
        <div className={PageDashboardAppUseStyle.row} />
      </div>
    </PageDashboardLayout>
  )
}
