import axios from 'axios'
import {
  collection,
  doc,
  DocumentReference,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
  where,
} from 'firebase/firestore'
import moment from 'moment'
import { collectionData, doc as rxDoc } from 'rxfire/firestore'
import { from, map, switchMap, zip } from 'rxjs'
import endpoints from '~/endpoints.config'
import {
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import { db } from '~/firebaseSetup'
import { ProfileInterestItemType } from '~/models/profile-interest-item'
import { ChartDatePickerOptionType, GeocodeResultType } from '~/types'
import helpers from '~/utils/helpers'

const apiUserCountPerStatus$ = () =>
  collectionData(collection(db, 'users')).pipe(
    map((users) => {
      const result: Record<USER_STATUS, number> = {
        [USER_STATUS.ACTIVE]: 0,
        [USER_STATUS.INACTIVE]: 0,
        [USER_STATUS.REST]: 0,
        [USER_STATUS.BAN]: 0,
        [USER_STATUS.QUIT]: 0,
      }

      users.forEach((user) => {
        // @ts-ignore
        result[user.status] += 1
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
      map((users) =>
        users.map((user) =>
          helpers.timestampColToStringDate(user.joinedAt, format),
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
      map((users) =>
        users.map((user) =>
          helpers.timestampColToStringDate(user.quitAt, format),
        ),
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
    map((userBlocks) => {
      const countList = userBlocks.map((userBlock) =>
        helpers.timestampColToStringDate(userBlock.createdAt, format),
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

  return collectionData(
    query(
      collection(db, 'user-invites'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc'),
    ),
  ).pipe(
    switchMap((userInvites) =>
      zip(
        userInvites.map((userInvite) =>
          rxDoc(doc(db, `users/${userInvite.targetUserKey}`)),
        ),
      ).pipe(
        map((users) => {
          const sendList = userInvites.map((ui) =>
            helpers.timestampColToStringDate(ui.createdAt, format),
          )

          const joinList = userInvites
            .filter((ui) =>
              users.some(
                (user) => user.id === ui.targetUserKey && user.data()?.joinedAt,
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
      ),
    ),
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
    map((requests) => {
      const result: Record<MADAM_REQUEST_STATUS, number> = {
        [MADAM_REQUEST_STATUS.ACCEPT]: 0,
        [MADAM_REQUEST_STATUS.COMPLETE]: 0,
        [MADAM_REQUEST_STATUS.REJECT]: 0,
        [MADAM_REQUEST_STATUS.REQUEST]: 0,
        [MADAM_REQUEST_STATUS.TIMEOUT]: 0,
      }

      requests.forEach((request) => {
        // @ts-ignore
        result[request.status] += 1
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
    map((requests) => {
      return dateArray.map((da) => {
        const date = moment(da).format(format)
        const list = requests.filter(
          (request) =>
            helpers.timestampColToStringDate(request.modifiedAt, format) ===
            date,
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

const apiPointsPerMadam$ = (count: number, offset?: QueryConstraint) =>
  collectionData(
    query(
      collection(db, 'madams'),
      orderBy('startDate', 'desc'),
      offset ?? startAfter(moment('9999-12-31').toDate()),
      limit(count),
    ),
  ).pipe(
    map((result) =>
      result.reverse().map((res) => helpers.convertFirestoreDataToModel(res)),
    ),
  )

const apiUserCountPerGender$ = () =>
  collectionData(collection(db, 'profiles')).pipe(
    map((profiles) => ({
      [GENDER.MALE]: profiles.filter(
        (profile) => profile.gender === GENDER.MALE,
      ).length,
      [GENDER.FEMALE]: profiles.filter(
        (profile) => profile.gender === GENDER.FEMALE,
      ).length,
    })),
  )

const apiUserCountPerSexualPreference$ = () =>
  collectionData(collection(db, 'profiles')).pipe(
    map((profiles) => ({
      [SEXUAL_PREFERENCE.BISEXUAL]: profiles.filter(
        (profile) => profile.findingFemale && profile.findingMale,
      ).length,
      [SEXUAL_PREFERENCE.HOMOSEXUAL]: profiles.filter(
        (profile) =>
          (profile.findingFemale && profile.gender === GENDER.FEMALE) ||
          (profile.findingMale && profile.gender === GENDER.MALE),
      ).length,
      [SEXUAL_PREFERENCE.STRAIGHT]: profiles.filter(
        (profile) =>
          (profile.findingFemale || profile.findingMale) &&
          ((profile.findingFemale && profile.gender === GENDER.MALE) ||
            (profile.findingMale && profile.gender === GENDER.FEMALE)),
      ).length,
    })),
  )

const apiCountryCount$ = () => {
  // window.navigator.geolocation.getCurrentPosition(
  //   async (position) => {
  //     const { latitude, longitude } = position.coords
  //     ;(await axios
  //       .get<{ results: GeocodeResultType[] }>(
  //         // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${endpoints.firebase.apiKey}`,
  //         `https://maps.googleapis.com/maps/api/geocode/json?address="서울"&key=${endpoints.firebase.apiKey}`,
  //       )
  //       .then((res) => {
  //         if (res.status === 200) {
  //           const foundRow = res.data.results.find((item) =>
  //             item.types.some((type) => type === 'country'),
  //           )
  //           if (!foundRow) {
  //             return []
  //           }

  //           console.log(res.data.results)
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

  return collectionData(collection(db, 'profiles')).pipe(
    switchMap((profiles) =>
      zip(
        profiles.map((profile) =>
          axios.get<{ results: GeocodeResultType[] }>(
            `https://maps.googleapis.com/maps/api/geocode/json?components=country:${profile.country}&key=${endpoints.firebase.apiKey}`,
          ),
        ),
      ).pipe(
        map((geocodes) => {
          const addresses = geocodes.map((geocode) => {
            if (geocode.status !== 200) {
              return null
            }

            const found = geocode.data.results.find(
              (item) =>
                item.types.some((type) => type === 'country') &&
                item.address_components.length > 0,
            )

            if (!found) {
              return null
            }

            return found.address_components[0]
          })

          const countries = profiles
            .filter((profile) =>
              addresses.some(
                (address) => address?.short_name === profile.country,
              ),
            )
            .map((profile) => ({
              code: profile.country as string,
              label:
                addresses.find(
                  (address) => address?.short_name === profile.country,
                )?.long_name ?? '',
            }))

          const results: Array<{ code: string; label: string; count: number }> =
            []

          countries.forEach((country) => {
            const idx = results.findIndex(
              (result) => result.code === country.code,
            )
            if (idx === -1) {
              results.push({ ...country, count: 1 })
            } else {
              results[idx].count += 1
            }
          })

          return results
        }),
      ),
    ),
  )
}

const apiInterestsCount$ = (isLike: boolean) => {
  return collectionData(collection(db, 'profiles')).pipe(
    switchMap((profiles) => {
      const interestsOrHates: DocumentReference[] = []

      profiles.forEach((profile) => {
        profile[isLike ? 'interests' : 'hates']?.forEach(
          (interest: DocumentReference) => {
            interestsOrHates.push(interest)
          },
        )
      })

      return interestsOrHates.length > 0
        ? zip(interestsOrHates.map((interestOrHate) => rxDoc(interestOrHate)))
        : from([])
    }),
    map((data) => {
      const result: Array<{ id: string; label: string; count: number }> = []

      data.forEach((datum) => {
        const { id } = datum
        const foundIndex = result.findIndex((res) => res.id === id)

        if (foundIndex > -1) {
          result[foundIndex].count += 1
        } else {
          const properties = datum.data() as ProfileInterestItemType
          result.push({ id, label: properties.itemKr, count: 1 })
        }
      })

      return result
    }),
  )
}

const apiDynamicProfileItemCount$ = async (
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
  apiUserCountPerGender$,
  apiUserCountPerSexualPreference$,
  apiCountryCount$,
  apiInterestsCount$,
  apiDynamicProfileItemCount$,
}
