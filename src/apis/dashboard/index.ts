import { collection, orderBy, query, where } from 'firebase/firestore'
import moment from 'moment'
import { collection as rxCollection, collectionData } from 'rxfire/firestore'
import { map, zip } from 'rxjs'
import {
  ChartDatePickerOptionType,
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import { db } from '~/firebaseSetup'
import helpers from '~/utils/helpers'

const apiUserCountPerStatus$ = () =>
  collectionData(collection(db, 'users')).pipe(
    map((docs) => {
      const statusList = docs.map((doc) => doc.status)

      return {
        [USER_STATUS.ACTIVE]: statusList.filter(
          (status) => status === USER_STATUS.ACTIVE,
        ).length,
        [USER_STATUS.INACTIVE]: statusList.filter(
          (status) => status === USER_STATUS.INACTIVE,
        ).length,
        [USER_STATUS.REST]: statusList.filter(
          (status) => status === USER_STATUS.REST,
        ).length,
        [USER_STATUS.BAN]: statusList.filter(
          (status) => status === USER_STATUS.BAN,
        ).length,
        [USER_STATUS.QUIT]: statusList.filter(
          (status) => status === USER_STATUS.QUIT,
        ).length,
      }
    }),
  )

const apiQuitAndJoinCount$ = (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
) => {
  const startDt = moment(startDate).toDate()
  const endDt = moment(endDate).toDate()

  const dateArray = helpers.getDateRangeArray(range, [startDt, endDt])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return zip(
    collectionData(
      query(
        collection(db, 'users'),
        where('joinedAt', '>=', startDt),
        where('joinedAt', '<=', endDt),
        orderBy('joinedAt'),
      ),
    ).pipe(
      map((docs) =>
        docs.map((doc) =>
          helpers.timestampColToStringDate(doc.joinedAt, format),
        ),
      ),
    ),
    collectionData(
      query(
        collection(db, 'users'),
        where('quitAt', '>=', startDt),
        where('quitAt', '<=', endDt),
        orderBy('quitAt'),
      ),
    ).pipe(
      map((docs) =>
        docs.map((doc) => helpers.timestampColToStringDate(doc.quitAt, format)),
      ),
    ),
  ).pipe(
    map((data) =>
      dateArray.map((da) => {
        const date = moment(da).format(format)
        const [joinCount, quitCount] = data.map(
          (datum) => datum.filter((d) => d === date).length,
        )

        return {
          date,
          joinCount,
          quitCount,
        }
      }),
    ),
  )
}

const apiReportCount$ = (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
) => {
  const startDt = moment(startDate).toDate()
  const endDt = moment(endDate).toDate()

  const dateArray = helpers.getDateRangeArray(range, [startDt, endDt])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return collectionData(
    query(
      collection(db, 'user-blocks'),
      where('createdAt', '>=', startDt),
      where('createdAt', '<=', endDt),
      orderBy('createdAt'),
    ),
  ).pipe(
    map((docs) => {
      const countList = docs.map((doc) =>
        helpers.timestampColToStringDate(doc.createdAt, format),
      )

      return dateArray.map((da) => {
        const date = moment(da).format(format)

        return {
          date,
          count: countList.filter((datum) => datum === date).length,
        }
      })
    }),
  )
}

const apiSendLinkAndJoinCount$ = (
  startDate: string,
  endDate: string,
  range: ChartDatePickerOptionType,
) => {
  const startDt = moment(startDate).toDate()
  const endDt = moment(endDate).toDate()

  const dateArray = helpers.getDateRangeArray(range, [startDt, endDt])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return zip([
    collectionData(
      query(
        collection(db, 'user-invites'),
        where('createdAt', '>=', startDt),
        where('createdAt', '<=', endDt),
        orderBy('createdAt'),
      ),
    ),
    rxCollection(collection(db, 'users')),
  ]).pipe(
    map((docs) => {
      const [userInvites, users] = docs

      const sendList = userInvites.map((ui) =>
        helpers.timestampColToStringDate(ui.createdAt, format),
      )

      const joinList = userInvites
        .filter((ui) =>
          users.some(
            (user) => user.id === ui.inviteUserKey && !!user.data().joinedAt,
          ),
        )
        .map((ui) => helpers.timestampColToStringDate(ui.createdAt, format))

      return dateArray.map((da) => {
        const date = moment(da).format(format)

        return {
          date,
          sendCount: sendList.filter((d) => d === date).length,
          joinCount: joinList.filter((d) => d === date).length,
        }
      })
    }),
  )
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
  apiUserCountPerStatus$,
  apiQuitAndJoinCount$,
  apiReportCount$,
  apiSendLinkAndJoinCount$,
  apiMadamRequestStatusPerWeek,
  apiMadamRequestCount,
  apiPointsPerMadam,
  apiUserCountPerGender,
  apiUserCountPerSexualPreference,
  apiCountryCount,
  apiInterestsCount,
  apiDynamicProfileItemCount,
}
