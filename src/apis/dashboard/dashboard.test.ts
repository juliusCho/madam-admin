import { deleteApp, FirebaseApp } from 'firebase/app'
import { startAfter } from 'firebase/firestore'
import moment from 'moment'
import {
  COUPLE_ACTION,
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import { initializeTestFirebase } from '~/__fixtures__'
import api from '.'
import { apiSystemVariable } from '..'

describe('API Dashboard', () => {
  let app: FirebaseApp

  beforeEach(() => {
    const init = initializeTestFirebase()
    app = init.app
  })

  afterEach(() => {
    deleteApp(app).catch(() => undefined)
  })

  xit('apiUserCountPerStatus$', (done) => {
    api.apiUserCountPerStatus$().subscribe((result) => {
      result.forEach((res) => {
        expect(res.status in USER_STATUS).toBeTruthy()
        expect(typeof res.count).toBe('number')
      })

      done()
    })
  })

  describe('apiQuitAndJoinCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api
        .apiQuitAndJoinCount$(startDate, endDate, 'week')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(7)
          expect(typeof result[0][0]).toBe('string')
          expect(result[0][0]).toBe(startDate)
          expect(result[6][0]).toBe(endDate)
          expect(
            result.map((res) => res[1]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()
          expect(
            result.map((res) => res[2]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()

          done()
        })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api
        .apiQuitAndJoinCount$(startDate, endDate, 'month')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length + 4).toBeGreaterThanOrEqual(30)
          expect(result.length + 4).toBeLessThan(40)
          expect(result[0][0]).toBe(startDate)
          expect(result[result.length - 1][0]).toBe(endDate)

          done()
        })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiQuitAndJoinCount$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiQuitAndJoinCount$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api
        .apiQuitAndJoinCount$(startDate, endDate, 'year')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(12)
          expect(result[0][0]).toBe(startDate)
          expect(result[11][0]).toBe(endDate)

          done()
        })
    })
  })

  describe('apiReportCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api.apiReportCount$(startDate, endDate, 'week').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(7)
        expect(typeof result[0][0]).toBe('string')
        expect(result[0][0]).toBe(startDate)
        expect(result[6][0]).toBe(endDate)
        expect(
          result.map((res) => res[1]).some((res) => typeof res !== 'number'),
        ).toBeFalsy()

        done()
      })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api.apiReportCount$(startDate, endDate, 'month').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length + 4).toBeGreaterThanOrEqual(30)
        expect(result.length + 4).toBeLessThan(40)
        expect(result[0][0]).toBe(startDate)
        expect(result[result.length - 1][0]).toBe(endDate)

        done()
      })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiReportCount$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiReportCount$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api.apiReportCount$(startDate, endDate, 'year').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(12)
        expect(result[0][0]).toBe(startDate)
        expect(result[11][0]).toBe(endDate)

        done()
      })
    })
  })

  describe('apiSendLinkAndJoinCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api
        .apiSendLinkAndJoinCount$(startDate, endDate, 'week')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(7)
          expect(typeof result[0][0]).toBe('string')
          expect(result[0][0]).toBe(startDate)
          expect(result[6][0]).toBe(endDate)
          expect(
            result.map((res) => res[1]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()
          expect(
            result.map((res) => res[2]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()

          done()
        })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api
        .apiSendLinkAndJoinCount$(startDate, endDate, 'month')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length + 4).toBeGreaterThanOrEqual(30)
          expect(result.length + 4).toBeLessThan(40)
          expect(result[0][0]).toBe(startDate)
          expect(result[result.length - 1][0]).toBe(endDate)

          done()
        })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiSendLinkAndJoinCount$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiSendLinkAndJoinCount$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api
        .apiSendLinkAndJoinCount$(startDate, endDate, 'year')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(12)
          expect(result[0][0]).toBe(startDate)
          expect(result[11][0]).toBe(endDate)

          done()
        })
    })
  })

  xit('apiMadamRequestStatusPerWeek$', (done) => {
    api
      .apiMadamRequestStatusPerWeek$(moment().toDate(), moment().toDate())
      .subscribe((result) => {
        result.forEach((res) => {
          expect(res.status in MADAM_REQUEST_STATUS).toBeTruthy()
          expect(typeof res.count).toBe('number')
        })

        done()
      })
  })

  describe('apiMadamRequestCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api
        .apiMadamRequestCount$(startDate, endDate, 'week')
        .subscribe((result) => {
          expect(result.length).toBe(7)
          expect(result[0][0]).toBe(startDate)
          expect(result[6][0]).toBe(endDate)

          done()
        })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api
        .apiMadamRequestCount$(startDate, endDate, 'month')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length + 4).toBeGreaterThanOrEqual(30)
          expect(result.length + 4).toBeLessThan(40)
          expect(result[0][0]).toBe(startDate)
          expect(result[result.length - 1][0]).toBe(endDate)

          done()
        })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiMadamRequestCount$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiMadamRequestCount$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api
        .apiMadamRequestCount$(startDate, endDate, 'year')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(12)
          expect(result[0][0]).toBe(startDate)
          expect(result[11][0]).toBe(endDate)

          done()
        })
    })
  })

  describe('apiPointsPerMadam$', () => {
    xit('limit to 0', (done) => {
      api.apiPointsPerMadam$(0).subscribe((result) => {
        expect(result.length).toBe(0)
        done()
      })
    })
    xit('limit to 1', (done) => {
      api.apiPointsPerMadam$(1).subscribe((result) => {
        expect(result.length).toBe(1)
        done()
      })
    })
  })

  xit('apiUserCountPerGender$', (done) => {
    api.apiUserCountPerGender$().subscribe((result) => {
      result.forEach((res) => {
        expect(res.status in GENDER).toBeTruthy()
        expect(typeof res.count).toBe('number')
      })

      done()
    })
  })

  xit('apiUserCountPerSexualPreference$', (done) => {
    api.apiUserCountPerSexualPreference$().subscribe((result) => {
      result.forEach((res) => {
        expect(res.status in SEXUAL_PREFERENCE).toBeTruthy()
        expect(typeof res.count).toBe('number')
      })

      done()
    })
  })

  xit('apiCountryCount$', (done) => {
    api.apiCountryCount$().subscribe((result) => {
      if (!result || result.length === 0) {
        done()
        return
      }

      Object.keys(result[0]).forEach((key, idx) => {
        if (idx === 0) {
          expect(key).toBe('code')
        } else if (idx === 1) {
          expect(key).toBe('label')
        } else {
          expect(key).toBe('count')
        }
      })

      done()
    })
  })

  xit('apiInterestsCount$', (done) => {
    api.apiInterestsCount$(true).subscribe((result) => {
      if (!result || result.length === 0) {
        done()
        return
      }

      result.forEach((data) => {
        expect('id' in data).toBeTruthy()
        expect('label' in data).toBeTruthy()
        expect('count' in data).toBeTruthy()
      })

      done()
    })
  })

  xit('apiDynamicProfileItemCount$', (done) => {
    apiSystemVariable
      .apiGetProfileExtraItems$({
        limit: 1,
        offset: startAfter(moment('9999-12-31').toDate()),
        sort: {
          column: 'modifiedAt',
          type: 'desc',
        },
      })
      .subscribe((profileExtraItems) => {
        api
          .apiDynamicProfileItemCount$(profileExtraItems[0].key)
          .subscribe((result) => {
            if (!result || result.length === 0) {
              done()
              return
            }

            result.forEach((data) => {
              expect('label' in data).toBeTruthy()
              expect('count' in data).toBeTruthy()
            })

            done()
          })
      })
  })

  describe('apiMatchPerCouplingCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api
        .apiMatchPerCouplingCount$(startDate, endDate, 'week')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(7)
          expect(
            Object.keys(result[0]).some(
              (key) =>
                key !== 'date' &&
                key !== 'couplingCount' &&
                key !== 'matchCount',
            ),
          ).toBeFalsy()
          expect(result[0][0]).toBe(startDate)
          expect(result[6][0]).toBe(endDate)
          expect(
            result.map((res) => res[1]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()
          expect(
            result.map((res) => res[2]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()

          done()
        })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api
        .apiMatchPerCouplingCount$(startDate, endDate, 'month')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length + 4).toBeGreaterThanOrEqual(30)
          expect(result.length + 4).toBeLessThan(40)
          expect(result[0][0]).toBe(startDate)
          expect(result[result.length - 1][0]).toBe(endDate)

          done()
        })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiMatchPerCouplingCount$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiMatchPerCouplingCount$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api
        .apiMatchPerCouplingCount$(startDate, endDate, 'year')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(12)
          expect(result[0][0]).toBe(startDate)
          expect(result[11][0]).toBe(endDate)

          done()
        })
    })
  })

  xit('apiCoupleStatus$', (done) => {
    api.apiCoupleStatus$().subscribe((result) => {
      result.forEach((res) => {
        expect(res.status in COUPLE_ACTION).toBeTruthy()
        expect(typeof res.count === 'number').toBeTruthy()
      })

      done()
    })
  })

  xit('apiCharmPurchaseCount$', (done) => {
    api.apiCharmPurchaseCount$().subscribe((result) => {
      expect(typeof result).toBe('array')
      expect(typeof result[0]).toBe('array')
      expect(typeof result[0][0]).toBe('string')
      expect(typeof result[0][1]).toBe('number')

      done()
    })
  })

  describe('apiChatCount$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api.apiChatCount$(startDate, endDate, 'week').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(7)
        expect(typeof result[0][0]).toBe('string')
        expect(typeof result[0][1]).toBe('number')
        expect(result[0][0]).toBe(startDate)
        expect(result[6][0]).toBe(endDate)
        expect(
          result.map((res) => res[1]).some((res) => typeof res !== 'number'),
        ).toBeFalsy()

        done()
      })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api.apiChatCount$(startDate, endDate, 'month').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length + 4).toBeGreaterThanOrEqual(30)
        expect(result.length + 4).toBeLessThan(40)
        expect(result[0][0]).toBe(startDate)
        expect(result[result.length - 1][0]).toBe(endDate)

        done()
      })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api.apiChatCount$(startDate, endDate, '3-months').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(3)
        expect(result[0][0]).toBe(startDate)
        expect(result[2][0]).toBe(endDate)

        done()
      })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api.apiChatCount$(startDate, endDate, '6-months').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(6)
        expect(result[0][0]).toBe(startDate)
        expect(result[5][0]).toBe(endDate)

        done()
      })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api.apiChatCount$(startDate, endDate, 'year').subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) {
          done()
          return
        }

        expect(result.length).toBe(12)
        expect(result[0][0]).toBe(startDate)
        expect(result[11][0]).toBe(endDate)

        done()
      })
    })
  })

  describe('apiCountPerInquiryType$', () => {
    xit('일주일', (done) => {
      const startDate = moment().hour(0).add(-7, 'days').toDate()
      const endDate = moment().hour(0).add(-1, 'days').toDate()

      api
        .apiCountPerInquiryType$(startDate, endDate, 'week')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(7)
          expect(typeof result[0][0]).toBe('string')
          expect(typeof result[0][1]).toBe('number')
          expect(typeof result[0][2]).toBe('number')
          expect(typeof result[0][3]).toBe('number')
          expect(result[0][0]).toBe(startDate)
          expect(result[6][0]).toBe(endDate)
          expect(
            result.map((res) => res[1]).some((res) => typeof res !== 'number'),
          ).toBeFalsy()

          done()
        })
    })

    xit('한달', (done) => {
      const startDate = moment().hour(0).add(-1, 'months').date(1).toDate()
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).toDate()

      api
        .apiCountPerInquiryType$(startDate, endDate, 'month')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length + 4).toBeGreaterThanOrEqual(30)
          expect(result.length + 4).toBeLessThan(40)
          expect(result[0][0]).toBe(startDate)
          expect(result[result.length - 1][0]).toBe(endDate)

          done()
        })
    })

    xit('3개월', (done) => {
      const startDate = moment().hour(0).add(-3, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiCountPerInquiryType$(startDate, endDate, '3-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(3)
          expect(result[0][0]).toBe(startDate)
          expect(result[2][0]).toBe(endDate)

          done()
        })
    })

    xit('6개월', (done) => {
      const startDate = moment().hour(0).add(-6, 'months').toDate()
      const endDate = moment().hour(0).add(-1, 'months').toDate()

      api
        .apiCountPerInquiryType$(startDate, endDate, '6-months')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(6)
          expect(result[0][0]).toBe(startDate)
          expect(result[5][0]).toBe(endDate)

          done()
        })
    })

    xit('1년', (done) => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .toDate()
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .toDate()

      api
        .apiCountPerInquiryType$(startDate, endDate, 'year')
        .subscribe((result) => {
          expect(result).not.toBeNull()
          if (!result) {
            done()
            return
          }

          expect(result.length).toBe(12)
          expect(result[0][0]).toBe(startDate)
          expect(result[11][0]).toBe(endDate)

          done()
        })
    })
  })
})
