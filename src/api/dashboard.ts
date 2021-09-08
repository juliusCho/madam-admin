import moment from 'moment'
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
): Promise<Array<{
  date: string
  joinCount: number
  quitCount: number
}> | null> => {
  const dateArray = helpers.getDateRangeArray('days', [
    moment(startDate).toDate(),
    moment(endDate).toDate(),
  ])

  const result = [
    { date: '', joinCount: 200, quitCount: 100 },
    { date: '', joinCount: 358, quitCount: 3 },
    { date: '', joinCount: 690, quitCount: 26 },
    { date: '', joinCount: 590, quitCount: 42 },
    { date: '', joinCount: 1203, quitCount: 52 },
    { date: '', joinCount: 1489, quitCount: 3 },
    { date: '', joinCount: 1479, quitCount: 1 },
  ]

  return dateArray.map((date, idx) => ({
    ...result[idx],
    date: moment(date).format('YYYY-MM-DD'),
  }))
}

export default {
  apiUserCountPerStatus,
  apiQuitAndJoinCount,
}
