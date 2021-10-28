import moment from 'moment'
import {
  ChartDatePickerOptionType,
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import helpers from '~/utils/helpers'

const apiUserCountPerStatus = async (): Promise<Record<
  USER_STATUS,
  number
> | null> => {
  const result = { ACTIVE: 13, INACTIVE: 1, REST: 3, BAN: 7, QUIT: 2 }

  return result
}

const apiQuitAndJoinCount = async (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
): Promise<Array<{
  date: string
  joinCount: number
  quitCount: number
}> | null> => {
  const dateArray = helpers.getDateRangeArray(range, [
    moment(startDate).toDate(),
    moment(endDate).toDate(),
  ])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  const result = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
  ]

  const monthResult = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
  ]

  const month3Result = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
  ]

  const month6Result = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
  ]

  const yearResult = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
  ]

  switch (range) {
    case 'month':
      return dateArray.map((date, idx) => ({
        ...monthResult[idx],
        date: moment(date).format(format),
      }))
    case '3-months':
      return dateArray.map((date, idx) => ({
        ...month3Result[idx],
        date: moment(date).format(format),
      }))
    case '6-months':
      return dateArray.map((date, idx) => ({
        ...month6Result[idx],
        date: moment(date).format(format),
      }))
    case 'year':
      return dateArray.map((date, idx) => ({
        ...yearResult[idx],
        date: moment(date).format(format),
      }))
    default:
      return dateArray.map((date, idx) => ({
        ...result[idx],
        date: moment(date).format(format),
      }))
  }
}

const apiReportCount = async (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
): Promise<Array<{
  date: string
  count: number
}> | null> => {
  const dateArray = helpers.getDateRangeArray(range, [
    moment(startDate).toDate(),
    moment(endDate).toDate(),
  ])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  const result = [
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
  ]

  const monthResult = [
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
  ]

  const month3Result = [
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
  ]

  const month6Result = [
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
  ]

  const yearResult = [
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
    { date: '', count: 1489 },
    { date: '', count: 1479 },
    { date: '', count: 200 },
    { date: '', count: 358 },
    { date: '', count: 690 },
    { date: '', count: 590 },
    { date: '', count: 1203 },
  ]

  switch (range) {
    case 'month':
      return dateArray.map((date, idx) => ({
        ...monthResult[idx],
        date: moment(date).format(format),
      }))
    case '3-months':
      return dateArray.map((date, idx) => ({
        ...month3Result[idx],
        date: moment(date).format(format),
      }))
    case '6-months':
      return dateArray.map((date, idx) => ({
        ...month6Result[idx],
        date: moment(date).format(format),
      }))
    case 'year':
      return dateArray.map((date, idx) => ({
        ...yearResult[idx],
        date: moment(date).format(format),
      }))
    default:
      return dateArray.map((date, idx) => ({
        ...result[idx],
        date: moment(date).format(format),
      }))
  }
}

const apiSendLinkAndJoinCount = async (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
): Promise<Array<{
  date: string
  sendCount: number
  joinCount: number
}> | null> => {
  const dateArray = helpers.getDateRangeArray(range, [
    moment(startDate).toDate(),
    moment(endDate).toDate(),
  ])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  const result = [
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
  ]

  const monthResult = [
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
  ]

  const month3Result = [
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
  ]

  const month6Result = [
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
  ]

  const yearResult = [
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
    { date: '', sendCount: 1489, joinCount: 3 },
    { date: '', sendCount: 1479, joinCount: 1 },
    { date: '', sendCount: 200, joinCount: 100 },
    { date: '', sendCount: 358, joinCount: 3 },
    { date: '', sendCount: 690, joinCount: 26 },
    { date: '', sendCount: 590, joinCount: 42 },
    { date: '', sendCount: 1203, joinCount: 52 },
  ]

  switch (range) {
    case 'month':
      return dateArray.map((date, idx) => ({
        ...monthResult[idx],
        date: moment(date).format(format),
      }))
    case '3-months':
      return dateArray.map((date, idx) => ({
        ...month3Result[idx],
        date: moment(date).format(format),
      }))
    case '6-months':
      return dateArray.map((date, idx) => ({
        ...month6Result[idx],
        date: moment(date).format(format),
      }))
    case 'year':
      return dateArray.map((date, idx) => ({
        ...yearResult[idx],
        date: moment(date).format(format),
      }))
    default:
      return dateArray.map((date, idx) => ({
        ...result[idx],
        date: moment(date).format(format),
      }))
  }
}

const apiMadamRequestStatusPerWeek = async (
  startDate: string,
  endDate: string,
): Promise<Record<MADAM_REQUEST_STATUS, number> | null> => {
  const result = { REQUEST: 13, ACCEPT: 1, REJECT: 3, COMPLETE: 7, TIMEOUT: 2 }

  return result
}

const apiMadamRequestCount = async (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
): Promise<Array<{
  date: string
  requestCount: number
  acceptCount: number
  rejectCount: number
  completeCount: number
  timeoutCount: number
}> | null> => {
  const dateArray = helpers.getDateRangeArray(range, [
    moment(startDate).toDate(),
    moment(endDate).toDate(),
  ])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  const result = [
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
  ]

  const monthResult = [
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
  ]

  const month3Result = [
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
  ]

  const month6Result = [
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
  ]

  const yearResult = [
    {
      date: '',
      requestCount: 200,
      acceptCount: 180,
      rejectCount: 20,
      completeCount: 140,
      timeoutCount: 40,
    },
    {
      date: '',
      requestCount: 358,
      acceptCount: 308,
      rejectCount: 50,
      completeCount: 288,
      timeoutCount: 20,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
    {
      date: '',
      requestCount: 690,
      acceptCount: 690,
      rejectCount: 0,
      completeCount: 90,
      timeoutCount: 600,
    },
    {
      date: '',
      requestCount: 590,
      acceptCount: 420,
      rejectCount: 170,
      completeCount: 420,
      timeoutCount: 0,
    },
    {
      date: '',
      requestCount: 1203,
      acceptCount: 393,
      rejectCount: 810,
      completeCount: 390,
      timeoutCount: 3,
    },
    {
      date: '',
      requestCount: 1489,
      acceptCount: 760,
      rejectCount: 729,
      completeCount: 710,
      timeoutCount: 50,
    },
    {
      date: '',
      requestCount: 1479,
      acceptCount: 920,
      rejectCount: 559,
      completeCount: 140,
      timeoutCount: 780,
    },
  ]

  switch (range) {
    case 'month':
      return dateArray.map((date, idx) => ({
        ...monthResult[idx],
        date: moment(date).format(format),
      }))
    case '3-months':
      return dateArray.map((date, idx) => ({
        ...month3Result[idx],
        date: moment(date).format(format),
      }))
    case '6-months':
      return dateArray.map((date, idx) => ({
        ...month6Result[idx],
        date: moment(date).format(format),
      }))
    case 'year':
      return dateArray.map((date, idx) => ({
        ...yearResult[idx],
        date: moment(date).format(format),
      }))
    default:
      return dateArray.map((date, idx) => ({
        ...result[idx],
        date: moment(date).format(format),
      }))
  }
}

const apiPointsPerMadam = async (
  offset: number,
  count: number,
): Promise<{
  data: Array<{ madam: string; point: number }>
  isEnd?: boolean
} | null> => {
  let tmp: Array<{ madam: string; point: number }> = [
    {
      madam: moment()
        .add(offset - 4, 'weeks')
        .format('YYYY-MM-DD'),
      point: 2114,
    },
    {
      madam: moment()
        .add(offset - 3, 'weeks')
        .format('YYYY-MM-DD'),
      point: 3613,
    },
    {
      madam: moment()
        .add(offset - 2, 'weeks')
        .format('YYYY-MM-DD'),
      point: 4321,
    },
    {
      madam: moment()
        .add(offset - 1, 'weeks')
        .format('YYYY-MM-DD'),
      point: 4820,
    },
  ]

  const result: Record<
    string,
    boolean | Array<{ madam: string; point: number }>
  > = {
    data: [...tmp],
  }

  if (count >= 10) {
    tmp = [
      {
        madam: moment()
          .add(offset - 10, 'weeks')
          .format('YYYY-MM-DD'),
        point: 1422,
      },
      {
        madam: moment()
          .add(offset - 9, 'weeks')
          .format('YYYY-MM-DD'),
        point: 1583,
      },
      {
        madam: moment()
          .add(offset - 8, 'weeks')
          .format('YYYY-MM-DD'),
        point: 1865,
      },
      {
        madam: moment()
          .add(offset - 7, 'weeks')
          .format('YYYY-MM-DD'),
        point: 2114,
      },
      {
        madam: moment()
          .add(offset - 6, 'weeks')
          .format('YYYY-MM-DD'),
        point: 1613,
      },
      {
        madam: moment()
          .add(offset - 5, 'weeks')
          .format('YYYY-MM-DD'),
        point: 1742,
      },
      ...tmp,
    ]

    result.data = [...tmp]
  }

  if (count >= 20) {
    result.data = [
      ...tmp.map((data) => ({
        ...data,
        madam: moment(data.madam)
          .add(offset - 10, 'weeks')
          .format('YYYY-MM-DD'),
      })),
      ...tmp,
    ]
  }

  if (count >= 30) {
    result.data = [
      ...tmp.map((data) => ({
        ...data,
        madam: moment(data.madam)
          .add(offset - 20, 'weeks')
          .format('YYYY-MM-DD'),
      })),
      ...tmp.map((data) => ({
        ...data,
        madam: moment(data.madam)
          .add(offset - 10, 'weeks')
          .format('YYYY-MM-DD'),
      })),
      ...tmp,
    ]
  }

  return { ...result, isEnd: false } as {
    data: Array<{ madam: string; point: number }>
    isEnd?: boolean
  }
}

const apiUserCountPerGender = async (): Promise<Record<
  GENDER,
  number
> | null> => {
  const result = { MALE: 48291, FEMALE: 29308 }

  return result
}

const apiUserCountPerSexualPreference = async (): Promise<Record<
  SEXUAL_PREFERENCE,
  number
> | null> => {
  const result = { STRAIGHT: 45231, HOMOSEXUAL: 2931, BISEXUAL: 9204 }

  return result
}

type GeocodeResultType = {
  address_components: { long_name: string; short_name: string }[]
  types: string[]
}

const apiCountryCount = async (): Promise<
  Array<{ code: string; label: string; count: number }>
> => {
  return [{ code: 'KR', label: '대한민국', count: 104340 }]

  // window.navigator.geolocation.getCurrentPosition(
  //   async (position) => {
  //     const { latitude, longitude } = position.coords

  //     (await axios
  //       .get<{ results: GeocodeResultType[] }>(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${endpoints.firebase.apiKey}`,
  //       )
  //       .then((res) => {
  //         if (res.status === 200) {
  //           const foundRow = res.data.results.find((item) =>
  //             item.types.some((type) => type === 'country'),
  //           )
  //           if (!foundRow) {
  //             return []
  //           }

  //           return [
  //             {
  //               code: foundRow.address_components[0].short_name,
  //               label: foundRow.address_components[0].short_name,
  //             },
  //           ]
  //         }

  //         console.log('error Reverse Geocode API', res.statusText)
  //         return []
  //       })
  //       .catch((e) => {
  //         console.log('error Reverse Geocode API', e)
  //         return []
  //       })) as Array<{ code: string; label: string; count: number }>
  //   },
  //   (err) => {
  //     console.log('error Navigator Geolocation API', err)
  //   },
  // )
}

const apiInterestsCount = async (
  isLike: boolean,
): Promise<Array<{ id: string; label: string; count: number }> | null> => {
  return [
    { id: '1', label: isLike ? '사랑' : '증오', count: 24543 },
    { id: '2', label: isLike ? '연애' : '이별', count: 3535 },
    { id: '3', label: isLike ? '결혼' : '이혼', count: 76435 },
    { id: '4', label: isLike ? '애인' : '바람', count: 57763 },
  ]
}

const apiDynamicProfileItemCount = async (
  id: string,
): Promise<Array<{ label: string; count: number }>> => {
  const result = [
    { count: 24543 },
    { count: 3535 },
    { count: 76435 },
    { count: 57763 },
  ]

  switch (id) {
    case '1':
      return result.map((res) => ({ ...res, label: 'ISTJ' }))
    case '2':
      return result.map((res) => ({ ...res, label: '무교' }))
    case '3':
      return result.map((res) => ({ ...res, label: 'B형' }))
    default:
      return result.map((res) => ({ ...res, label: '물고기자리' }))
  }
}

export default {
  apiUserCountPerStatus,
  apiQuitAndJoinCount,
  apiReportCount,
  apiSendLinkAndJoinCount,
  apiMadamRequestStatusPerWeek,
  apiMadamRequestCount,
  apiPointsPerMadam,
  apiUserCountPerGender,
  apiUserCountPerSexualPreference,
  apiCountryCount,
  apiInterestsCount,
  apiDynamicProfileItemCount,
}
