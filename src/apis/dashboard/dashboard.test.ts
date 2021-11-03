import { deleteApp, FirebaseApp } from 'firebase/app'
import moment from 'moment'
import {
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import { initializeTestFirebase } from '~/__fixtures__'
import api from '.'

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
      expect(
        Object.keys(result).some((key) => !(key in USER_STATUS)),
      ).toBeFalsy()
      expect(
        Object.values(result).some((value) => typeof value !== 'number'),
      ).toBeFalsy()
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
          expect(
            Object.keys(result[0]).some(
              (key) =>
                key !== 'date' && key !== 'joinCount' && key !== 'quitCount',
            ),
          ).toBeFalsy()
          expect(result[0].date).toBe(startDate)
          expect(result[6].date).toBe(endDate)
          expect(
            result
              .map((res) => res.joinCount)
              .some((res) => typeof res !== 'number'),
          ).toBeFalsy()
          expect(
            result
              .map((res) => res.quitCount)
              .some((res) => typeof res !== 'number'),
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
          expect(result[0].date).toBe(startDate)
          expect(result[result.length - 1].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[2].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[5].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[11].date).toBe(endDate)

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
        expect(
          Object.keys(result[0]).some(
            (key) => key !== 'date' && key !== 'count',
          ),
        ).toBeFalsy()
        expect(result[0].date).toBe(startDate)
        expect(result[6].date).toBe(endDate)
        expect(
          result.map((res) => res.count).some((res) => typeof res !== 'number'),
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
        expect(result[0].date).toBe(startDate)
        expect(result[result.length - 1].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[2].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[5].date).toBe(endDate)

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
        expect(result[0].date).toBe(startDate)
        expect(result[11].date).toBe(endDate)

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
          expect(
            Object.keys(result[0]).some(
              (key) =>
                key !== 'date' && key !== 'joinCount' && key !== 'sendCount',
            ),
          ).toBeFalsy()
          expect(result[0].date).toBe(startDate)
          expect(result[6].date).toBe(endDate)
          expect(
            result
              .map((res) => res.joinCount)
              .some((res) => typeof res !== 'number'),
          ).toBeFalsy()
          expect(
            result
              .map((res) => res.sendCount)
              .some((res) => typeof res !== 'number'),
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
          expect(result[0].date).toBe(startDate)
          expect(result[result.length - 1].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[2].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[5].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[11].date).toBe(endDate)

          done()
        })
    })
  })

  xit('apiMadamRequestStatusPerWeek$', (done) => {
    api
      .apiMadamRequestStatusPerWeek$(moment().toDate(), moment().toDate())
      .subscribe((result) => {
        expect(result).not.toBeNull()
        if (!result) return

        expect(
          Object.keys(result).some((key) => !(key in MADAM_REQUEST_STATUS)),
        ).toBeFalsy()
        expect(
          Object.values(result).some((value) => typeof value !== 'number'),
        ).toBeFalsy()

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
                key !== MADAM_REQUEST_STATUS.ACCEPT &&
                key !== MADAM_REQUEST_STATUS.COMPLETE &&
                key !== MADAM_REQUEST_STATUS.REJECT &&
                key !== MADAM_REQUEST_STATUS.REQUEST &&
                key !== MADAM_REQUEST_STATUS.TIMEOUT,
            ),
          ).toBeFalsy()
          expect(result[0].date).toBe(startDate)
          expect(result[6].date).toBe(endDate)
          Object.keys(MADAM_REQUEST_STATUS).forEach((key) => {
            expect(
              result
                // @ts-ignore
                .map((res) => res[key])
                .some((res) => typeof res !== 'number'),
            ).toBeFalsy()
          })

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
          expect(result[0].date).toBe(startDate)
          expect(result[result.length - 1].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[2].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[5].date).toBe(endDate)

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
          expect(result[0].date).toBe(startDate)
          expect(result[11].date).toBe(endDate)

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
      expect(result).not.toBeNull()
      if (!result) {
        done()
        return
      }

      expect(Object.keys(result).some((key) => !(key in GENDER))).toBeFalsy()
      expect(
        Object.values(result).some((value) => typeof value !== 'number'),
      ).toBeFalsy()

      done()
    })
  })

  xit('apiUserCountPerSexualPreference$', (done) => {
    api.apiUserCountPerSexualPreference$().subscribe((result) => {
      expect(result).not.toBeNull()
      if (!result) {
        done()
        return
      }

      expect(
        Object.keys(result).some((key) => !(key in SEXUAL_PREFERENCE)),
      ).toBeFalsy()
      expect(
        Object.values(result).some((value) => typeof value !== 'number'),
      ).toBeFalsy()

      done()
    })
  })
})
