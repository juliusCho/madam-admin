/* eslint-disable no-case-declarations */
import moment from 'moment'
import { ROUTER_PATH } from '../../constants'
import endpointsConfig from '../../endpoints.config'
import { ChartDatePickerOptionType, ScreenOptionType } from '../../types'

export default {
  convertTextToTailwind(text?: string) {
    if (!text) return ''

    return `text-${text} font-${text}`
  },
  convertColorToTailwind(
    type: 'bg' | 'text' | 'border' | 'placeholder',
    color?: string,
    isNotButtonOrDisabled?: boolean,
  ) {
    if (!color) {
      return `${type}-transparent`
    }

    return `${type}-${color}${
      isNotButtonOrDisabled
        ? ''
        : ` hover:${type}-${color}Hover active:${type}-${color}Active`
    }`
  },
  encode(input: string | number) {
    return btoa(
      `${String(input)}-${endpointsConfig.snsKeySecret}-${String(input)}`,
    )
  },
  decode(input: string) {
    const key = atob(input).split(`-${endpointsConfig.snsKeySecret}-`)
    return key[0]
  },
  isMobile() {
    let check = false
    ;(function (a: string) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a,
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4),
        )
      ) {
        check = true
      }
    })(navigator.userAgent || navigator.vendor)
    return check
  },
  firstDepthTab(route: string, device?: ScreenOptionType) {
    let result = [
      {
        title: '대시보드',
        route: ROUTER_PATH.DASHBOARD.APP_USE,
        selected:
          route === ROUTER_PATH.DASHBOARD.APP_USE ||
          route === ROUTER_PATH.DASHBOARD.BEST_MADAM ||
          route === ROUTER_PATH.DASHBOARD.COUPLING ||
          route === ROUTER_PATH.DASHBOARD.USER ||
          route === ROUTER_PATH.DASHBOARD.ETC,
      },
    ]

    if (device !== 'mobile' && device !== 'smallScreen') {
      result = [
        ...result,
        ...[
          {
            title: '설정 변수',
            route: ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
            selected:
              route === ROUTER_PATH.SYSTEM_VARIABLE.CONFIG ||
              route === ROUTER_PATH.SYSTEM_VARIABLE.PROFILE ||
              route === ROUTER_PATH.SYSTEM_VARIABLE.SELECT,
          },
          {
            title: '포인트 플랜',
            route: ROUTER_PATH.POINT_PLAN,
            selected: route === ROUTER_PATH.POINT_PLAN,
          },
          {
            title: '헬프데스크',
            route: ROUTER_PATH.HELP_DESK.BASE_USE,
            selected:
              route === ROUTER_PATH.HELP_DESK.BASE_USE ||
              route === ROUTER_PATH.HELP_DESK.ACCOUNT ||
              route === ROUTER_PATH.HELP_DESK.BEST_MADAM ||
              route === ROUTER_PATH.HELP_DESK.COUPLING ||
              route === ROUTER_PATH.HELP_DESK.MADAM_TEAM ||
              route === ROUTER_PATH.HELP_DESK.MEETING,
          },
          {
            title: '문의글 답변',
            route: ROUTER_PATH.QNA,
            selected: route === ROUTER_PATH.QNA,
          },
          {
            title: '유저관리',
            route: ROUTER_PATH.USER.BLOCK,
            selected:
              route === ROUTER_PATH.USER.BLOCK ||
              route === ROUTER_PATH.USER.INTEREST ||
              route === ROUTER_PATH.USER.PHOTO ||
              route === ROUTER_PATH.USER.PROFILE,
          },
        ],
      ]
    }

    return result
  },
  secondDepthTab(route: string) {
    return {
      DASHBOARD: [
        {
          title: '앱 사용',
          route: ROUTER_PATH.DASHBOARD.APP_USE,
          selected: route === ROUTER_PATH.DASHBOARD.APP_USE,
        },
        {
          title: '최고의 마담',
          route: ROUTER_PATH.DASHBOARD.BEST_MADAM,
          selected: route === ROUTER_PATH.DASHBOARD.BEST_MADAM,
        },
        {
          title: '유저',
          route: ROUTER_PATH.DASHBOARD.USER,
          selected: route === ROUTER_PATH.DASHBOARD.USER,
        },
        {
          title: '소개팅',
          route: ROUTER_PATH.DASHBOARD.COUPLING,
          selected: route === ROUTER_PATH.DASHBOARD.COUPLING,
        },
        {
          title: '기타',
          route: ROUTER_PATH.DASHBOARD.ETC,
          selected: route === ROUTER_PATH.DASHBOARD.ETC,
        },
      ],
      SYSTEM_VARIABLE: [
        {
          title: '시스템 설정 변수',
          route: ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
          selected: route === ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
        },
        {
          title: '유저 프로필 추가선택 항목',
          route: ROUTER_PATH.SYSTEM_VARIABLE.PROFILE,
          selected: route === ROUTER_PATH.SYSTEM_VARIABLE.PROFILE,
        },
        {
          title: '선택 요소',
          route: ROUTER_PATH.SYSTEM_VARIABLE.SELECT,
          selected: route === ROUTER_PATH.SYSTEM_VARIABLE.SELECT,
        },
      ],
      HELP_DESK: [
        {
          title: '앱 기본 사용',
          route: ROUTER_PATH.HELP_DESK.BASE_USE,
          selected: route === ROUTER_PATH.HELP_DESK.BASE_USE,
        },
        {
          title: '계정',
          route: ROUTER_PATH.HELP_DESK.ACCOUNT,
          selected: route === ROUTER_PATH.HELP_DESK.ACCOUNT,
        },
        {
          title: '소개팅',
          route: ROUTER_PATH.HELP_DESK.COUPLING,
          selected: route === ROUTER_PATH.HELP_DESK.COUPLING,
        },
        {
          title: '미팅',
          route: ROUTER_PATH.HELP_DESK.MEETING,
          selected: route === ROUTER_PATH.HELP_DESK.MEETING,
        },
        {
          title: '최고의 마담',
          route: ROUTER_PATH.HELP_DESK.BEST_MADAM,
          selected: route === ROUTER_PATH.HELP_DESK.BEST_MADAM,
        },
        {
          title: 'Madam 팀',
          route: ROUTER_PATH.HELP_DESK.MADAM_TEAM,
          selected: route === ROUTER_PATH.HELP_DESK.MADAM_TEAM,
        },
      ],
      USER: [
        {
          title: '신고/차단',
          route: ROUTER_PATH.USER.BLOCK,
          selected: route === ROUTER_PATH.USER.BLOCK,
        },
        {
          title: '관심사',
          route: ROUTER_PATH.USER.INTEREST,
          selected: route === ROUTER_PATH.USER.INTEREST,
        },
        {
          title: '사진',
          route: ROUTER_PATH.USER.PHOTO,
          selected: route === ROUTER_PATH.USER.PHOTO,
        },
        {
          title: '프로필',
          route: ROUTER_PATH.USER.PROFILE,
          selected: route === ROUTER_PATH.USER.PROFILE,
        },
      ],
    }
  },
  convertToMoneyFormat(num: number) {
    const minus = num < 0 ? '-' : ''
    const str = String(Math.abs(num))
    let result = ''

    let idx = 0
    for (let i = str.length - 1, ii = 0; i >= ii; i -= 1) {
      if (idx > 0 && idx % 3 === 0) {
        result = `,${result}`
      }
      result = str[i] + result
      idx += 1
    }

    return minus + result
  },
  getYesterday(isStart?: boolean, date?: Date) {
    const yesterday = moment(date ?? new Date())
      .add(-1, 'days')
      .toDate()
    return this[isStart ? 'setToStartDate' : 'setToEndDate'](yesterday)
  },
  getLastWeek(date?: Date) {
    const lastWeek = moment(date ?? new Date())
      .add(-7, 'days')
      .toDate()
    return this.setToStartDate(lastWeek)
  },
  getLastMonth(isStart?: boolean, date?: Date) {
    let lastMonth = moment(date ?? new Date()).toDate()
    if (isStart) {
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      lastMonth.setDate(1)
    } else {
      lastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 0)
    }
    return this[isStart ? 'setToStartDate' : 'setToEndDate'](lastMonth)
  },
  getPreviousThreeMonth(date?: Date) {
    const previousThreeMonth = moment(date ?? new Date())
      .add(-3, 'months')
      .date(1)
      .toDate()
    return this.setToStartDate(previousThreeMonth)
  },
  getPreviousSixMonth(date?: Date) {
    const previousSixMonth = moment(date ?? new Date())
      .add(-6, 'months')
      .date(1)
      .toDate()
    return this.setToStartDate(previousSixMonth)
  },
  getPreviousSevenMonth(date?: Date) {
    const previousSevenMonth = moment(date ?? new Date())
      .add(-7, 'months')
      .date(1)
      .toDate()
    return this.setToStartDate(previousSevenMonth)
  },
  getLastYear(isStart?: boolean, date?: Date) {
    const lastYear = moment(date ?? new Date()).toDate()
    lastYear.setFullYear(lastYear.getFullYear() - 1)
    if (isStart) {
      lastYear.setMonth(0)
      lastYear.setDate(1)
    } else {
      lastYear.setMonth(11)
      lastYear.setDate(31)
    }
    return this[isStart ? 'setToStartDate' : 'setToEndDate'](lastYear)
  },
  getPreviousTwoYear(date?: Date) {
    const lastYear = moment(date ?? new Date())
      .add(-2, 'years')
      .month(0)
      .date(1)
      .toDate()
    return this.setToStartDate(lastYear)
  },
  setToEndDate(date: Date) {
    return moment(date)
      .hours(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(999)
      .toDate()
  },
  setToStartDate(date: Date) {
    return moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate()
  },
  getDateRangeArray(range: ChartDatePickerOptionType, dates: Date[]) {
    if (dates.length === 1) {
      return dates
    }

    let num = 0
    let setFnc: 'setDate' | 'setMonth' = 'setDate'
    let getFnc: 'getDate' | 'getMonth' = 'getDate'

    switch (range) {
      case 'day':
      case 'week':
      case 'month':
        num = moment(dates[1]).diff(dates[0], 'days')
        break
      default:
        num = moment(dates[1]).diff(dates[0], 'months')
        setFnc = 'setMonth'
        getFnc = 'getMonth'
        break
    }

    const result: Date[] = [dates[0]]

    for (let i = 1; i < num; i += 1) {
      const newDate = moment(dates[0]).toDate()
      newDate[setFnc](dates[0][getFnc]() + i)
      result.push(newDate)
    }

    result.push(dates[1])
    return result
  },
  changeChartDate(
    set:
      | React.Dispatch<
          React.SetStateAction<undefined | Date | Array<undefined | Date>>
        >
      | ((date?: Date | Array<undefined | Date>) => void),
    date?: Date | Array<Date | undefined>,
    inputOption?: ChartDatePickerOptionType,
  ) {
    switch (inputOption) {
      case 'day':
        if (!date) {
          set([this.getYesterday(), this.getYesterday()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getYesterday(), this.getYesterday()])
            return
          }

          if (date.length === 1) {
            const dt = date[0] ?? this.getYesterday()
            set([dt, dt])
            return
          }

          const dt = date[0] ?? date[1] ?? this.getYesterday()
          set([dt, dt])
          return
        }

        set([date, date])
        return
      case 'week':
        if (!date) {
          set([this.getLastWeek(), this.getYesterday()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getLastWeek(), this.getYesterday()])
            return
          }

          if (date.length === 1) {
            if (date[0]) {
              set([moment(date[0]).add(-6, 'days').toDate(), date[0]])
              return
            }

            set([this.getLastWeek(), this.getYesterday()])
            return
          }

          if (date[0]) {
            if (date[1]) {
              if (moment(date[1]).diff(moment(date[0]), 'days') <= 6) {
                set([date[0], date[1]])
                return
              }

              set([date[0], moment(date[0]).add(6, 'days').toDate()])
              return
            }

            set([moment(date[0]).add(-6, 'days').toDate(), date[0]])
            return
          }

          if (date[1]) {
            set([moment(date[1]).add(-6, 'days').toDate(), date[1]])
            return
          }

          set([this.getLastWeek(), this.getYesterday()])
          return
        }

        set([moment(date).add(-6, 'days').toDate(), date])
        return
      case 'month':
        if (!date) {
          set([this.getLastMonth(true), this.getLastMonth()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getLastMonth(true), this.getLastMonth()])
            return
          }

          if (date.length === 1) {
            if (date[0]) {
              const end = new Date(
                date[0].getFullYear(),
                date[0].getMonth() + 1,
                0,
              )
              set([moment(date[0]).date(1).toDate(), end])
              return
            }
            set([this.getLastMonth(true), this.getLastMonth()])
            return
          }

          let dt = date[0] ?? date[1] ?? this.getLastMonth()
          const dtNum = Number(moment(dt).format('YYYYMM'))
          const maxMonth = Number(moment(this.getLastMonth()).format('YYYYMM'))
          if (dtNum > maxMonth) {
            dt = this.getLastMonth()
          }
          const end = new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
          set([moment(dt).date(1).toDate(), end])
          return
        }

        const endDt = new Date(
          (date as Date).getFullYear(),
          (date as Date).getMonth() + 1,
          0,
        )
        set([moment(date).date(1).toDate(), endDt])
        return
      case '3-months':
        if (!date) {
          set([this.getPreviousThreeMonth(), this.getLastMonth()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getPreviousThreeMonth(), this.getLastMonth()])
            return
          }

          if (date.length === 1) {
            if (date[0]) {
              set([moment(date[0]).add(-2, 'months').toDate(), date[0]])
              return
            }

            set([this.getPreviousThreeMonth(), this.getLastMonth()])
            return
          }

          if (date[0]) {
            if (date[1]) {
              if (moment(date[1]).diff(moment(date[0]), 'months') <= 2) {
                set([date[0], date[1]])
                return
              }

              set([date[0], moment(date[0]).add(2, 'months').toDate()])
              return
            }

            set([moment(date[0]).add(-2, 'months').toDate(), date[0]])
            return
          }

          if (date[1]) {
            set([moment(date[1]).add(-2, 'months').toDate(), date[1]])
            return
          }

          set([this.getPreviousThreeMonth(), this.getLastMonth()])
          return
        }

        set([moment(date).add(-2, 'months').toDate(), date])
        return
      case '6-months':
        if (!date) {
          set([this.getPreviousSevenMonth(), this.getLastMonth()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getPreviousSevenMonth(), this.getLastMonth()])
            return
          }

          if (date.length === 1) {
            if (date[0]) {
              set([moment(date[0]).add(-5, 'months').toDate(), date[0]])
              return
            }

            set([this.getPreviousSevenMonth(), this.getLastMonth()])
            return
          }

          if (date[0]) {
            if (date[1]) {
              if (moment(date[1]).diff(moment(date[0]), 'months') <= 5) {
                set([date[0], date[1]])
                return
              }

              set([date[0], moment(date[0]).add(5, 'months').toDate()])
              return
            }

            set([moment(date[0]).add(-5, 'months').toDate(), date[0]])
            return
          }

          if (date[1]) {
            set([moment(date[1]).add(-5, 'months').toDate(), date[1]])
            return
          }

          set([this.getPreviousSevenMonth(), this.getLastMonth()])
          return
        }

        set([moment(date).add(-5, 'months').toDate(), date])
        return
      case 'year':
        if (!date) {
          set([this.getPreviousTwoYear(), this.getLastYear()])
          return
        }

        if (Array.isArray(date)) {
          if (date.length === 0) {
            set([this.getPreviousTwoYear(), this.getLastYear()])
            return
          }

          if (date.length === 1) {
            if (date[0]) {
              set([
                moment(date[0]).month(0).date(1).toDate(),
                moment(date[0]).month(11).date(31).toDate(),
              ])
            } else {
              set([this.getPreviousTwoYear(), this.getLastYear()])
            }
            return
          }

          let dt = date[0] ?? date[1] ?? this.getLastYear()
          const dtNum = Number(moment(dt).format('YYYY'))
          const maxYear = Number(moment(this.getLastYear()).format('YYYY'))
          if (dtNum > maxYear) {
            dt = this.getLastYear()
          }
          set([
            moment(dt).month(0).date(1).toDate(),
            moment(dt).month(11).date(31).toDate(),
          ])
          return
        }

        set([
          moment(date).month(0).date(1).toDate(),
          moment(date).month(11).date(31).toDate(),
        ])
        break
      default:
        break
    }
  },
}
