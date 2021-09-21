/* eslint-disable no-case-declarations */
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '../../../api'
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
  >([helpers.getPreviousTwoMonth(), helpers.getLastMonth()])
  const [reportChartDateOption, setReportChartDateOption] =
    React.useState<ChartDatePickerOption>('month')
  const [inviteChartDate, setInviteChartDate] = React.useState<
    undefined | Date | Array<Date | undefined>
  >([helpers.getPreviousSevenMonth(), helpers.getLastMonth()])
  const [inviteChartDateOption, setInviteChartDateOption] =
    React.useState<ChartDatePickerOption>('6-months')

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

  const changeChartDate = React.useCallback(
    (
      set: React.Dispatch<
        React.SetStateAction<undefined | Date | Array<undefined | Date>>
      >,
      date?: Date | Array<Date | undefined>,
      inputOption?: ChartDatePickerOption,
    ) => {
      switch (inputOption) {
        case 'day':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [helpers.getYesterday(), helpers.getYesterday()])
              return
            }

            if (date.length === 1) {
              const dt = date[0] ?? helpers.getYesterday()
              set(() => [dt, dt])
              return
            }

            const dt = date[0] ?? date[1] ?? helpers.getYesterday()
            set(() => [dt, dt])
            return
          }

          set(() => [date, date])
          return
        case 'week':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [helpers.getLastWeek(), helpers.getYesterday()])
              return
            }

            if (date.length === 1) {
              if (date[0]) {
                set(() => [moment(date[0]).add(-6, 'days').toDate(), date[0]])
                return
              }

              set(() => [helpers.getLastWeek(), helpers.getYesterday()])
              return
            }

            if (date[0]) {
              if (date[1]) {
                if (moment(date[1]).diff(moment(date[0]), 'days') <= 6) {
                  set(() => [date[0], date[1]])
                  return
                }

                const endDate = moment(date[0]).toDate()
                endDate.setDate(endDate.getDate() + 6)

                set(() => [date[0], endDate])
                return
              }

              set(() => [moment(date[0]).add(-6, 'days').toDate(), date[0]])
              return
            }

            if (date[1]) {
              set(() => [moment(date[1]).add(-6, 'days').toDate(), date[1]])
              return
            }

            set(() => [helpers.getLastWeek(), helpers.getYesterday()])
            return
          }

          set(() => [moment(date).add(-6, 'days').toDate(), date])
          return
        case 'month':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [helpers.getPreviousTwoMonth(), helpers.getLastMonth()])
              return
            }

            if (date.length === 1) {
              if (date[0]) {
                const str = moment(date[0]).toDate()
                str.setDate(1)
                const end = new Date(
                  date[0].getFullYear(),
                  date[0].getMonth() + 1,
                  0,
                )
                set(() => [str, end])
                return
              }
              set(() => [helpers.getPreviousTwoMonth(), helpers.getLastMonth()])
              return
            }

            let dt = date[0] ?? date[1] ?? helpers.getLastMonth()
            const dtNum = Number(moment(dt).format('YYYYMM'))
            const maxMonth = Number(
              moment(helpers.getLastMonth()).format('YYYYMM'),
            )
            if (dtNum > maxMonth) {
              dt = helpers.getLastMonth()
            }
            const str = moment(dt).toDate()
            str.setDate(1)
            const end = new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
            set(() => [str, end])
            return
          }

          const strDt = moment(date).toDate()
          strDt.setDate(1)
          const endDt = new Date(
            (date as Date).getFullYear(),
            (date as Date).getMonth() + 1,
            0,
          )
          set(() => [strDt, endDt])
          return
        case '3-months':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [
                helpers.getPreviousFourMonth(),
                helpers.getLastMonth(),
              ])
              return
            }

            if (date.length === 1) {
              if (date[0]) {
                set(() => [moment(date[0]).add(-2, 'months').toDate(), date[0]])
                return
              }

              set(() => [
                helpers.getPreviousFourMonth(),
                helpers.getLastMonth(),
              ])
              return
            }

            if (date[0]) {
              if (date[1]) {
                if (moment(date[1]).diff(moment(date[0]), 'months') <= 2) {
                  set(() => [date[0], date[1]])
                  return
                }

                const endDate = moment(date[0]).toDate()
                endDate.setMonth(endDate.getMonth() + 2)

                set(() => [date[0], endDate])
                return
              }

              set(() => [moment(date[0]).add(-2, 'months').toDate(), date[0]])
              return
            }

            if (date[1]) {
              set(() => [moment(date[1]).add(-2, 'months').toDate(), date[1]])
              return
            }

            set(() => [helpers.getPreviousFourMonth(), helpers.getLastMonth()])
            return
          }

          set(() => [moment(date).add(-2, 'months').toDate(), date])
          return
        case '6-months':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [
                helpers.getPreviousSevenMonth(),
                helpers.getLastMonth(),
              ])
              return
            }

            if (date.length === 1) {
              if (date[0]) {
                set(() => [moment(date[0]).add(-5, 'months').toDate(), date[0]])
                return
              }

              set(() => [
                helpers.getPreviousSevenMonth(),
                helpers.getLastMonth(),
              ])
              return
            }

            if (date[0]) {
              if (date[1]) {
                if (moment(date[1]).diff(moment(date[0]), 'months') <= 5) {
                  set(() => [date[0], date[1]])
                  return
                }

                const endDate = moment(date[0]).toDate()
                endDate.setMonth(endDate.getMonth() + 5)

                set(() => [date[0], endDate])
                return
              }

              set(() => [moment(date[0]).add(-5, 'months').toDate(), date[0]])
              return
            }

            if (date[1]) {
              set(() => [moment(date[1]).add(-5, 'months').toDate(), date[1]])
              return
            }

            set(() => [helpers.getPreviousSevenMonth(), helpers.getLastMonth()])
            return
          }

          set(() => [moment(date).add(-5, 'months').toDate(), date])
          return
        case 'year':
          if (Array.isArray(date)) {
            if (date.length === 0) {
              set(() => [helpers.getPreviousTwoYear(), helpers.getLastYear()])
              return
            }

            if (date.length === 1) {
              if (date[0]) {
                const str = moment(date[0]).toDate()
                str.setMonth(0)
                str.setDate(1)
                const end = moment(date[0]).toDate()
                end.setMonth(11)
                end.setDate(31)
                set(() => [str, end])
              } else {
                set(() => [helpers.getPreviousTwoYear(), helpers.getLastYear()])
              }
              return
            }

            let dt = date[0] ?? date[1] ?? helpers.getLastYear()
            const dtNum = Number(moment(dt).format('YYYY'))
            const maxYear = Number(moment(helpers.getLastYear()).format('YYYY'))
            if (dtNum > maxYear) {
              dt = helpers.getLastYear()
            }
            const str = moment(dt).toDate()
            str.setMonth(0)
            str.setDate(1)
            const end = moment(dt).toDate()
            end.setMonth(11)
            end.setDate(31)
            set(() => [str, end])
            return
          }

          const str = moment(date).toDate()
          str.setMonth(0)
          str.setDate(1)
          const end = moment(date).toDate()
          end.setMonth(11)
          end.setDate(31)
          set(() => [str, end])
          break
        default:
          break
      }
    },
    [],
  )

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
      changeChartDate(setConnectChartDate, date, inputOption)
      return
    }

    changeChartDate(setConnectChartDate, date, connectChartDateOption)
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
      changeChartDate(setReportChartDate, date, inputOption)
      return
    }

    changeChartDate(setReportChartDate, date, reportChartDateOption)
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
      changeChartDate(setInviteChartDate, date, inputOption)
      return
    }

    changeChartDate(setInviteChartDate, date, inviteChartDateOption)
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
              type: connectChartDateOption,
              date: connectChartDate,
              onChange: onChangeConnectChartDate,
              format: connectChartFormat,
              maxDate: connectChartMaxDate,
            }}
            className={PageDashboardAppUseStyle.lineChart({ device })}
          />
        </div>
        <div className={PageDashboardAppUseStyle.row({ device })} />
      </div>
    </PageDashboardLayout>
  )
}
