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
import {
  collection as rxCollection,
  collectionData,
  doc as rxDoc,
} from 'rxfire/firestore'
import { from, map, switchMap, zip } from 'rxjs'
import {
  COUPLE_ACTION_LABEL,
  GENDER_LABEL,
  MADAM_REQUEST_STATUS_LABEL,
  SEXUAL_PREFERENCE_LABEL,
  USER_STATUS_LABEL,
} from '~/constants/app'
import endpoints from '~/endpoints.config'
import {
  COUPLE_ACTION,
  GENDER,
  INQUIRY_TYPE,
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
        result[user.status as USER_STATUS] += 1
      })

      return Object.keys(result).map((key) => ({
        status: key as string,
        label: USER_STATUS_LABEL[key as USER_STATUS],
        count: result[key as USER_STATUS],
      }))
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

        return [date, joinCount, quitCount] as [string, number, number]
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

        return [date, countList.filter((datum) => datum === date).length] as [
          string,
          number,
        ]
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

            return [
              date,
              sendList.filter((d) => d === date).length,
              joinList.filter((d) => d === date).length,
            ] as [string, number, number]
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
        result[request.status as MADAM_REQUEST_STATUS] += 1
      })

      return Object.keys(result).map((key) => ({
        status: key,
        count: result[key as MADAM_REQUEST_STATUS],
        label: MADAM_REQUEST_STATUS_LABEL[key as MADAM_REQUEST_STATUS],
      }))
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

        return [
          date,
          list.filter((data) => data.status === MADAM_REQUEST_STATUS.ACCEPT)
            .length,
          list.filter((data) => data.status === MADAM_REQUEST_STATUS.COMPLETE)
            .length,
          list.filter((data) => data.status === MADAM_REQUEST_STATUS.REJECT)
            .length,
          list.filter((data) => data.status === MADAM_REQUEST_STATUS.REQUEST)
            .length,
          list.filter((data) => data.status === MADAM_REQUEST_STATUS.TIMEOUT)
            .length,
        ] as Array<string | number>
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
    map((result) =>
      Object.keys(result).map((key) => ({
        status: key,
        label: GENDER_LABEL[key as GENDER],
        count: result[key as GENDER],
      })),
    ),
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
    map((result) =>
      Object.keys(result).map((key) => ({
        status: key,
        label: SEXUAL_PREFERENCE_LABEL[key as SEXUAL_PREFERENCE],
        count: result[key as SEXUAL_PREFERENCE],
      })),
    ),
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

const apiInterestsCount$ = (isLike: boolean) =>
  collectionData(collection(db, 'profiles')).pipe(
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

const apiDynamicProfileItemCount$ = (id: string) =>
  rxDoc(doc(db, `/profile-extra-items/${id}`)).pipe(
    switchMap((profileExtraItem) =>
      zip(
        rxCollection(
          query(
            collection(db, 'profile-select-items'),
            where('profileExtraItemKey', '==', profileExtraItem.id),
          ),
        ),
        collectionData(
          query(
            collection(db, 'profile-extra-values'),
            where('profileExtraItem', '==', profileExtraItem.ref),
          ),
        ),
      ).pipe(
        map((result) => {
          const [profileSelectItemsSnapshot, profileExtraValues] = result

          return profileSelectItemsSnapshot.map(
            (profileSelectItemSnapshot) => ({
              label: profileSelectItemSnapshot.data().labelKr,
              count: profileExtraValues.filter(
                (profileExtraValue) =>
                  profileExtraValue.value === profileSelectItemSnapshot.id,
              ).length,
            }),
          )
        }),
      ),
    ),
  )

const apiMatchPerCouplingCount$ = (
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
      collection(db, 'couples'),
      where('modifiedAt', '>=', startDate),
      where('modifiedAt', '<=', endDate),
      orderBy('modifiedAt', 'desc'),
    ),
  ).pipe(
    map((couples) => {
      const couplingList = couples.map((ui) => ({
        date: helpers.timestampColToStringDate(ui.modifiedAt, format),
        isMatched: ui.isMatched,
      }))

      return dateArray.map((da) => {
        const date = moment(da).format(format)
        const filteredList = couplingList.filter((d) => d.date === date)

        return [
          date,
          filteredList.length,
          filteredList.filter((d) => d.isMatched).length,
        ] as [string, number, number]
      })
    }),
  )
}

const apiCoupleStatus$ = () =>
  collectionData(collection(db, 'couples')).pipe(
    map((couples) => {
      const result: Record<COUPLE_ACTION, number> = {
        [COUPLE_ACTION.BLOCK]: 0,
        [COUPLE_ACTION.DELETE]: 0,
        [COUPLE_ACTION.HATE]: 0,
        [COUPLE_ACTION.LIKE]: 0,
        [COUPLE_ACTION.MADAM]: 0,
        [COUPLE_ACTION.NONE]: 0,
        [COUPLE_ACTION.SUPER]: 0,
      }

      couples.forEach((couple) => {
        result[couple.firstUserStatus as COUPLE_ACTION] += 1
        result[couple.secondUserStatus as COUPLE_ACTION] += 1
      })

      return Object.keys(result).map((key) => ({
        status: key,
        label: COUPLE_ACTION_LABEL[key as COUPLE_ACTION],
        count: result[key as COUPLE_ACTION],
      }))
    }),
  )

const apiCharmPurchaseCount$ = () =>
  collectionData(collection(db, 'charm-plans')).pipe(
    map((charmPlans) =>
      charmPlans
        .sort((a, b) => {
          const aDollar = Number(a.dollar)
          const bDollar = Number(b.dollar)

          if (aDollar > bDollar) {
            return 1
          }
          if (bDollar > aDollar) {
            return -1
          }
          return 0
        })
        .map(
          (charmPlan) =>
            [
              (charmPlan.label ?? `$${charmPlan.dollar}`) as string,
              charmPlan.purchaseCount as number,
            ] as [string, number],
        ),
    ),
  )

const apiChatCount$ = (
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
      collection(db, 'chats'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc'),
    ),
  )
    .pipe(
      map((users) =>
        users.map((user) =>
          helpers.timestampColToStringDate(user.createdAt, format),
        ),
      ),
    )
    .pipe(
      map((data) =>
        dateArray.map((da) => {
          const date = moment(da).format(format)

          return [date, data.filter((d) => d === date).length] as [
            string,
            number,
          ]
        }),
      ),
    )
}

const apiCountPerInquiryType$ = (
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
      collection(db, 'inquiries'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc'),
    ),
  ).pipe(
    map((inquiries) => {
      const inquiryList = inquiries.map((ui) => ({
        date: helpers.timestampColToStringDate(ui.createdAt, format),
        type: ui.type,
      }))

      return dateArray.map((da) => {
        const date = moment(da).format(format)
        const filteredList = inquiryList.filter((d) => d.date === date)

        return [
          date,
          filteredList.filter((d) => d.type === INQUIRY_TYPE.INQUIRY).length,
          filteredList.filter((d) => d.type === INQUIRY_TYPE.REQUEST).length,
          filteredList.filter((d) => d.type === INQUIRY_TYPE.ETC).length,
        ] as [string, number, number, number]
      })
    }),
  )
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
  apiCountPerInquiryType$,
  apiCoupleStatus$,
  apiCharmPurchaseCount$,
  apiMatchPerCouplingCount$,
  apiChatCount$,
}
