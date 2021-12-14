/* eslint-disable no-case-declarations */
import moment from 'moment'
import { ROUTER_PATH } from '~/constants/etc'
import endpointsConfig from '~/endpoints.config'
import {
  BorderCSS,
  BorderDirection,
  BorderRadius,
  BorderRadiusDirection,
  BorderStyle,
  ChartDatePickerOptionType,
  ScreenOptionType,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'

export const convertColorToTailwind = (
  type: 'bg' | 'text' | 'border' | 'placeholder',
  color?: string,
  isNotButtonOrDisabled?: boolean,
) => {
  if (!color) {
    return `${type}-transparent`
  }

  return `${type}-${color}${
    isNotButtonOrDisabled
      ? ''
      : ` hover:${type}-${color}Hover active:${type}-${color}Active`
  }`
}

export const convertFontToTailwindClass = (font?: TailwindFontSize) => {
  if (!font) {
    return ''
  }

  return `text-${font} font-${font}`
}

export const convertFontSizeToCSSSize = (font?: TailwindFontSize) => {
  switch (font) {
    case 'titleMassive':
      return '2rem'
    case 'titleBig':
      return '1.5rem'
    case 'titleMedium':
    case 'titleSmall':
      return '1.25rem'
    case 'subTitleBig':
      return '1.125rem'
    case 'textBig':
    case 'textMedium':
    case 'textSmall':
    case 'subBig':
      return '0.875rem'
    case 'subMedium':
      return '0.75rem'
    case 'subSmall':
      return '0.625rem'
    default:
      return '1rem'
  }
}

export const convertColorToHex = (color?: TailwindColorPalette) => {
  switch (color) {
    case 'mono-black':
      return '#333'
    case 'mono-paleBlack':
      return '#666'
    case 'mono-darkGray':
      return '#999'
    case 'mono-gray':
      return '#CCC'
    case 'mono-lightGray':
      return '#DDD'
    case 'mono-pale':
      return '#EEE'
    case 'mono-paleWhite':
      return '#f7f7f7'
    case 'mono-white':
      return '#fff'
    case 'main-red':
      return '#F85A5E'
    case 'main-blue':
      return '#3067A8'
    case 'main-navy':
      return '#001B57'
    case 'main-darkNavy':
      return '#1F2940'
    case 'main-yellow':
      return '#F7C954'
    case 'main-turquoise':
      return '#5EBCCA'
    case 'main-pink':
      return '#F97F90'
    case 'sub-babyPink':
      return '#FEDDDF'
    case 'sub-green':
      return '#92DCA9'
    case 'sub-sky':
      return '#58C5E3'
    case 'sub-darkPurple':
      return '#6258BA'
    case 'sub-paleYellow':
      return '#EABF80'
    case 'sub-purple':
      return '#B48BD3'
    case 'sub-lightGreen':
      return '#BBDA85'
    case 'sub-paleBlue':
      return '#A3B7ED'
    case 'sub-ocean':
      return '#99EAED'
    case 'sub-pink':
      return '#EF91AA'
    case 'sub-darkNavy':
      return '#233148'
    case 'sub-lightBlue':
      return '#4695EC'
    case 'sub-paleSky':
      return '#7FB2D6'
    case 'sub-lightYellow':
      return '#FFEC36'
    case 'sns-naver':
      return '#2AB404'
    case 'sns-facebook':
      return '#3B599B'
    case 'sns-kakao':
      return '#F7E106'
    case 'sns-google':
      return '#DA2915'
    case 'sns-apple':
      return '#222'
    default:
      return '#737373'
  }
}

export const convertBorderRadiusDirectionToTailwindClass = (
  borderRadiusDirection?: BorderRadiusDirection,
) => {
  switch (borderRadiusDirection) {
    case 'top':
      return '-t'
    case 'left':
      return '-l'
    case 'bottom':
      return '-b'
    case 'right':
      return '-r'
    case 'top-left':
      return '-tl'
    case 'top-right':
      return '-tr'
    case 'bottom-left':
      return '-bl'
    case 'bottom-right':
      return '-br'
    default:
      return ''
  }
}

export const convertBorderRadiusToTailwindClass = (
  borderRadius?: BorderRadius,
  borderRadiusDirection?: BorderRadiusDirection,
) => {
  return borderRadius
    ? `rounded${convertBorderRadiusDirectionToTailwindClass(
        borderRadiusDirection,
      )}${borderRadius === 'basic' ? '' : `-${borderRadius}`}`
    : ''
}

export const convertBorderDirectionToTailwindClass = (
  borderDirection?: BorderDirection,
) => {
  switch (borderDirection) {
    case 'top':
      return '-t'
    case 'left':
      return '-l'
    case 'bottom':
      return '-b'
    case 'right':
      return '-r'
    default:
      return ''
  }
}

export const convertBorderStyleToTailwindClass = (
  borderStyle?: BorderStyle,
  borderBold?: boolean,
  borderDirection?: BorderDirection,
) => {
  if (!borderStyle || borderStyle === 'none') {
    return ''
  }

  return `border${convertBorderDirectionToTailwindClass(borderDirection)}${
    borderBold ? '-2' : ''
  } border-${borderStyle}`
}

export const separateCSSValueToLengthAndUnit = (num?: string | number) => {
  if (!num) {
    return { length: 0, unit: 'px' }
  }
  const length = Number(
    String(num).replace(/px|em|rem|ex|ch|vw|vh|%|vmin|vmax/g, ''),
  )
  return {
    length,
    unit: String(num).substr(String(length).length, String(num).length),
  }
}

export const encode = (input: string | number) => {
  return btoa(
    `${String(input)}-${endpointsConfig.snsKeySecret}-${String(input)}`,
  )
}

export const decode = (input: string) => {
  const key = atob(input).split(`-${endpointsConfig.snsKeySecret}-`)
  return key[0]
}

export const isMobile = () => {
  const check = navigator.userAgent || navigator.vendor

  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      check,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      check.substr(0, 4),
    )
  )
}

export const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  )
}

export const firstDepthTab = (route: string, device?: ScreenOptionType) => {
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
}

export const secondDepthTab = (route: string) => {
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
}

export const convertToMoneyFormat = (num: number) => {
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
}

export const setToStartDate = (date: Date) => {
  return moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).toDate()
}

export const setToEndDate = (date: Date) => {
  return moment(date)
    .hours(23)
    .minutes(59)
    .seconds(59)
    .milliseconds(999)
    .toDate()
}

export const getYesterday = (isStart?: boolean, date?: Date) => {
  const yesterday = moment(date ?? new Date())
    .add(-1, 'days')
    .toDate()
  return isStart ? setToStartDate(yesterday) : setToEndDate(yesterday)
}

export const getLastWeek = (date?: Date) => {
  const lastWeek = moment(date ?? new Date())
    .add(-7, 'days')
    .toDate()
  return setToStartDate(lastWeek)
}

export const getLastMonth = (isStart?: boolean, date?: Date) => {
  let lastMonth = moment(date ?? new Date()).toDate()
  if (isStart) {
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    lastMonth.setDate(1)
  } else {
    lastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 0)
  }
  return isStart ? setToStartDate(lastMonth) : setToEndDate(lastMonth)
}

export const getPreviousThreeMonth = (date?: Date) => {
  const previousThreeMonth = moment(date ?? new Date())
    .add(-3, 'months')
    .date(1)
    .toDate()
  return setToStartDate(previousThreeMonth)
}

export const getPreviousSixMonth = (date?: Date) => {
  const previousSixMonth = moment(date ?? new Date())
    .add(-6, 'months')
    .date(1)
    .toDate()
  return setToStartDate(previousSixMonth)
}

export const getPreviousSevenMonth = (date?: Date) => {
  const previousSevenMonth = moment(date ?? new Date())
    .add(-7, 'months')
    .date(1)
    .toDate()
  return setToStartDate(previousSevenMonth)
}

export const getLastYear = (isStart?: boolean, date?: Date) => {
  const lastYear = moment(date ?? new Date()).toDate()
  lastYear.setFullYear(lastYear.getFullYear() - 1)
  if (isStart) {
    lastYear.setMonth(0)
    lastYear.setDate(1)
  } else {
    lastYear.setMonth(11)
    lastYear.setDate(31)
  }
  return isStart ? setToStartDate(lastYear) : setToEndDate(lastYear)
}

export const getPreviousTwoYear = (date?: Date) => {
  const lastYear = moment(date ?? new Date())
    .add(-2, 'years')
    .month(0)
    .date(1)
    .toDate()
  return setToStartDate(lastYear)
}

export const getDateRangeArray = (
  range: ChartDatePickerOptionType,
  dates: Date[],
) => {
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
}

export const changeChartDate = (
  set:
    | React.Dispatch<
        React.SetStateAction<undefined | Date | Array<undefined | Date>>
      >
    | ((date?: Date | Array<undefined | Date>) => void),
  date?: Date | Array<Date | undefined>,
  inputOption?: ChartDatePickerOptionType,
) => {
  switch (inputOption) {
    case 'day':
      if (!date) {
        set([getYesterday(), getYesterday()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getYesterday(), getYesterday()])
          return
        }

        if (date.length === 1) {
          const dt = date[0] ?? getYesterday()
          set([dt, dt])
          return
        }

        const dt = date[0] ?? date[1] ?? getYesterday()
        set([dt, dt])
        return
      }

      set([date, date])
      return
    case 'week':
      if (!date) {
        set([getLastWeek(), getYesterday()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getLastWeek(), getYesterday()])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            set([moment(date[0]).add(-6, 'days').toDate(), date[0]])
            return
          }

          set([getLastWeek(), getYesterday()])
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

        set([getLastWeek(), getYesterday()])
        return
      }

      set([moment(date).add(-6, 'days').toDate(), date])
      return
    case 'month':
      if (!date) {
        set([getLastMonth(true), getLastMonth()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getLastMonth(true), getLastMonth()])
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
          set([getLastMonth(true), getLastMonth()])
          return
        }

        let dt = date[0] ?? date[1] ?? getLastMonth()
        const dtNum = Number(moment(dt).format('YYYYMM'))
        const maxMonth = Number(moment(getLastMonth()).format('YYYYMM'))
        if (dtNum > maxMonth) {
          dt = getLastMonth()
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
        set([getPreviousThreeMonth(), getLastMonth()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getPreviousThreeMonth(), getLastMonth()])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            set([moment(date[0]).add(-2, 'months').toDate(), date[0]])
            return
          }

          set([getPreviousThreeMonth(), getLastMonth()])
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

        set([getPreviousThreeMonth(), getLastMonth()])
        return
      }

      set([moment(date).add(-2, 'months').toDate(), date])
      return
    case '6-months':
      if (!date) {
        set([getPreviousSevenMonth(), getLastMonth()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getPreviousSevenMonth(), getLastMonth()])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            set([moment(date[0]).add(-5, 'months').toDate(), date[0]])
            return
          }

          set([getPreviousSevenMonth(), getLastMonth()])
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

        set([getPreviousSevenMonth(), getLastMonth()])
        return
      }

      set([moment(date).add(-5, 'months').toDate(), date])
      return
    case 'year':
      if (!date) {
        set([getPreviousTwoYear(), getLastYear()])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          set([getPreviousTwoYear(), getLastYear()])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            set([
              moment(date[0]).month(0).date(1).toDate(),
              moment(date[0]).month(11).date(31).toDate(),
            ])
          } else {
            set([getPreviousTwoYear(), getLastYear()])
          }
          return
        }

        let dt = date[0] ?? date[1] ?? getLastYear()
        const dtNum = Number(moment(dt).format('YYYY'))
        const maxYear = Number(moment(getLastYear()).format('YYYY'))
        if (dtNum > maxYear) {
          dt = getLastYear()
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
}

export const timestampColToStringDate = (
  column?: null | { seconds: number },
  format = 'YYYY-MM-DD',
  toDate?: boolean,
) => {
  const dateObj = moment(Number(column?.seconds) * 1000)

  if (toDate) {
    return dateObj.toDate()
  }

  return dateObj.format(format)
}

export const getFlagEmoji = (countryCode: string) => {
  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split('')
      .map((x) => 0x1f1a5 + x.charCodeAt(0)),
  )
}

export const convertFirestoreDataToModel = <T extends Record<string, unknown>>(
  data: T,
) => {
  const result: Record<string, unknown> = {}

  Object.keys(data).forEach((key) => {
    // @ts-ignore
    if (typeof data[key] === 'object' && 'seconds' in data[key]) {
      // @ts-ignore
      result[key] = timestampColToStringDate(data[key], undefined, true)
    } else {
      result[key] = data[key]
    }
  })

  return result as T
}

export const makeTwoDigits = (num: number) => {
  if (num < 0) {
    return '00'
  }

  return num < 10 ? `0${num}` : String(num).substr(0, 2)
}

export const setValidDateTime = (year: number, month: number, day: number) => {
  const tmpDateStr = `${String(year)}.${makeTwoDigits(
    month + 1,
  )}.${makeTwoDigits(day)}`
  let resultYear = year
  let resultMonth = month
  let resultDay = day

  if (year < 0) resultYear = 1

  if (month < 0) resultMonth = 0
  else if (month > 11) resultMonth = 11

  if (day <= 0) resultDay = 1
  else if (day > 26 && !moment(tmpDateStr, 'YYYY.MM.DD', true).isValid()) {
    let dt = 31
    let text = `${resultYear}.${makeTwoDigits(resultMonth + 1)}.${String(dt)}`
    while (!moment(text, 'YYYY.MM.DD', true).isValid()) {
      dt -= 1
      text = `${resultYear}.${makeTwoDigits(resultMonth + 1)}.${String(dt)}`
    }
    resultDay = dt
  }
  return { year: resultYear, month: resultMonth, day: resultDay }
}

export const convertToDate = (input: string) => {
  const strings: string[] = input.split(/[- :]/)
  const arr: number[] = strings.map((str) => Number(str))
  if (arr.some((a) => Number.isNaN(a)) || arr.length < 3) return undefined

  const { year, month, day } = setValidDateTime(arr[0], arr[1] - 1, arr[2])

  if (arr.length < 6) {
    return new Date(year, month, day, 0, 0, 0)
  }

  let hour = 0
  let min = 0
  let sec = 0

  if (arr[3] > 23) {
    hour = 23
  } else {
    hour = arr[3] < 0 ? 0 : arr[3]
  }

  if (arr[4] > 59) {
    min = 59
  } else {
    min = arr[4] < 0 ? 0 : arr[4]
  }

  if (arr[5] > 59) {
    sec = 59
  } else {
    sec = arr[5] < 0 ? 0 : arr[5]
  }

  return new Date(year, month, day, hour, min, sec)
}

export const dateValidator = (input: string) => {
  const tmp = input.split('.')

  if (tmp.some((t) => Number.isNaN(t)) || tmp.length < 3) return null

  const { year, month, day } = setValidDateTime(
    Number(tmp[0]),
    Number(tmp[1]) - 1,
    Number(tmp[2]),
  )
  return new Date(year, month, day, 0, 0, 0)
}

export const convertBorderCSSToTailwind = ({
  borderStyle,
  borderBold,
  borderRadius,
  borderColor,
}: BorderCSS) => {
  return `
    ${convertBorderStyleToTailwindClass(borderStyle, borderBold)}
    ${convertBorderRadiusToTailwindClass(borderRadius)}
    ${convertColorToTailwind('border', borderColor, true)}
  `
}
