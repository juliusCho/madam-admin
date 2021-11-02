import {
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
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
      const result: Record<USER_STATUS, number> = {
        [USER_STATUS.ACTIVE]: 0,
        [USER_STATUS.INACTIVE]: 0,
        [USER_STATUS.REST]: 0,
        [USER_STATUS.BAN]: 0,
        [USER_STATUS.QUIT]: 0,
      }

      docs.forEach((doc) => {
        // @ts-ignore
        result[doc.status] += 1
      })

      return result
    }),
  )

const apiQuitAndJoinCount$ = (
  startDate: Date,
  endDate: Date,
  range: ChartDatePickerOptionType,
) => {
  const dateArray = helpers.getDateRangeArray(range, [startDate, endDate])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return zip(
    collectionData(
      query(
        collection(db, 'users'),
        where('joinedAt', '>=', startDate),
        where('joinedAt', '<=', endDate),
        orderBy('joinedAt', 'desc'),
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
        where('quitAt', '>=', startDate),
        where('quitAt', '<=', endDate),
        orderBy('quitAt', 'desc'),
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
  startDate: Date,
  endDate: Date,
  range: ChartDatePickerOptionType,
) => {
  const dateArray = helpers.getDateRangeArray(range, [startDate, endDate])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return collectionData(
    query(
      collection(db, 'user-blocks'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc'),
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
  startDate: Date,
  endDate: Date,
  range: ChartDatePickerOptionType,
) => {
  const dateArray = helpers.getDateRangeArray(range, [startDate, endDate])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return zip([
    collectionData(
      query(
        collection(db, 'user-invites'),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate),
        orderBy('createdAt', 'desc'),
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

const apiMadamRequestStatusPerWeek$ = (startDate: Date, endDate: Date) =>
  collectionData(
    query(
      collection(db, 'requests'),
      where('modifiedAt', '>=', startDate),
      where('modifiedAt', '<=', endDate),
      orderBy('modifiedAt', 'desc'),
    ),
  ).pipe(
    map((docs) => {
      const result: Record<MADAM_REQUEST_STATUS, number> = {
        [MADAM_REQUEST_STATUS.ACCEPT]: 0,
        [MADAM_REQUEST_STATUS.COMPLETE]: 0,
        [MADAM_REQUEST_STATUS.REJECT]: 0,
        [MADAM_REQUEST_STATUS.REQUEST]: 0,
        [MADAM_REQUEST_STATUS.TIMEOUT]: 0,
      }

      docs.forEach((doc) => {
        // @ts-ignore
        result[doc.status] += 1
      })

      return result
    }),
  )

const apiMadamRequestCount$ = (
  startDate: Date,
  endDate: Date,
  range: ChartDatePickerOptionType,
) => {
  const dateArray = helpers.getDateRangeArray(range, [startDate, endDate])
  let format = 'YYYY-MM-DD'

  if (range === 'year' || range === '3-months' || range === '6-months') {
    format = 'YYYY-MM'
  }

  return collectionData(
    query(
      collection(db, 'requests'),
      where('modifiedAt', '>=', startDate),
      where('modifiedAt', '<=', endDate),
      orderBy('modifiedAt', 'desc'),
    ),
  ).pipe(
    map((docs) => {
      return dateArray.map((da) => {
        const date = moment(da).format(format)
        const list = docs.filter(
          (doc) =>
            helpers.timestampColToStringDate(doc.modifiedAt, format) === date,
        )

        return {
          date,
          [MADAM_REQUEST_STATUS.ACCEPT]: list.filter(
            (data) => data.status === MADAM_REQUEST_STATUS.ACCEPT,
          ).length,
          [MADAM_REQUEST_STATUS.COMPLETE]: list.filter(
            (data) => data.status === MADAM_REQUEST_STATUS.COMPLETE,
          ).length,
          [MADAM_REQUEST_STATUS.REJECT]: list.filter(
            (data) => data.status === MADAM_REQUEST_STATUS.REJECT,
          ).length,
          [MADAM_REQUEST_STATUS.REQUEST]: list.filter(
            (data) => data.status === MADAM_REQUEST_STATUS.REQUEST,
          ).length,
          [MADAM_REQUEST_STATUS.TIMEOUT]: list.filter(
            (data) => data.status === MADAM_REQUEST_STATUS.TIMEOUT,
          ).length,
        }
      })
    }),
  )
}

const apiPointsPerMadam$ = (count: number, offset?: Date) =>
  collectionData(
    query(
      collection(db, 'madams'),
      orderBy('startDate', 'desc'),
      startAfter(offset ?? moment('9999-12-31').toDate()),
      limit(count),
    ),
  )

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
  apiMadamRequestStatusPerWeek$,
  apiMadamRequestCount$,
  apiPointsPerMadam$,
  apiUserCountPerGender,
  apiUserCountPerSexualPreference,
  apiCountryCount,
  apiInterestsCount,
  apiDynamicProfileItemCount,
}
