import moment from 'moment'
import { ChartDatePickerOptionType } from '../types'
import helpers from '../utils/helpers'

const apiUserCountPerStatus = async (
  token: string,
): Promise<Record<string, number> | null> => {
  const result = { ACTIVE: 13, INACTIVE: 1, REST: 3, BAN: 7, QUIT: 2 }

  return result
}

const apiQuitAndJoinCount = async (
  token: string,
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

const apiReportCount = (
  token: string,
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
) => {
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
  token: string,
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

export default {
  apiUserCountPerStatus,
  apiQuitAndJoinCount,
  apiReportCount,
  apiSendLinkAndJoinCount,
}
