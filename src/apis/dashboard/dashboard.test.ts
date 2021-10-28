import moment from 'moment'
import {
  GENDER,
  MADAM_REQUEST_STATUS,
  SEXUAL_PREFERENCE,
  USER_STATUS,
} from '~/enums'
import api from '.'

describe('API Dashboard', () => {
  it('apiUserCountPerStatus', async () => {
    const result = await api.apiUserCountPerStatus()

    expect(result).not.toBeNull()
    if (!result) return

    expect(Object.keys(result).some((key) => !(key in USER_STATUS))).toBeFalsy()
    expect(
      Object.values(result).some((value) => typeof value !== 'number'),
    ).toBeFalsy()
  })

  describe('apiQuitAndJoinCount', () => {
    it('일주일', async () => {
      const startDate = moment().hour(0).add(-7, 'days').format('YYYY-MM-DD')
      const endDate = moment().hour(0).add(-1, 'days').format('YYYY-MM-DD')

      const result = await api.apiQuitAndJoinCount(startDate, endDate, 'week')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(7)
      expect(
        Object.keys(result[0]).some(
          (key) => key !== 'date' && key !== 'joinCount' && key !== 'quitCount',
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
    })

    it('한달', async () => {
      const startDate = moment()
        .hour(0)
        .add(-1, 'months')
        .date(1)
        .format('YYYY-MM-DD')
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).format('YYYY-MM-DD')

      const result = await api.apiQuitAndJoinCount(startDate, endDate, 'month')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length + 4).toBeGreaterThanOrEqual(30)
      expect(result.length + 4).toBeLessThan(40)
      expect(result[0].date).toBe(startDate)
      expect(result[result.length - 1].date).toBe(endDate)
    })

    it('3개월', async () => {
      const startDate = moment().hour(0).add(-3, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiQuitAndJoinCount(
        startDate,
        endDate,
        '3-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(3)
      expect(result[0].date).toBe(startDate)
      expect(result[2].date).toBe(endDate)
    })

    it('6개월', async () => {
      const startDate = moment().hour(0).add(-6, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiQuitAndJoinCount(
        startDate,
        endDate,
        '6-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(6)
      expect(result[0].date).toBe(startDate)
      expect(result[5].date).toBe(endDate)
    })

    it('1년', async () => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .format('YYYY-MM')
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .format('YYYY-MM')

      const result = await api.apiQuitAndJoinCount(startDate, endDate, 'year')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(12)
      expect(result[0].date).toBe(startDate)
      expect(result[11].date).toBe(endDate)
    })
  })

  describe('apiReportCount', () => {
    it('일주일', async () => {
      const startDate = moment().hour(0).add(-7, 'days').format('YYYY-MM-DD')
      const endDate = moment().hour(0).add(-1, 'days').format('YYYY-MM-DD')

      const result = await api.apiReportCount(startDate, endDate, 'week')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(7)
      expect(
        Object.keys(result[0]).some((key) => key !== 'date' && key !== 'count'),
      ).toBeFalsy()
      expect(result[0].date).toBe(startDate)
      expect(result[6].date).toBe(endDate)
      expect(
        result.map((res) => res.count).some((res) => typeof res !== 'number'),
      ).toBeFalsy()
    })

    it('한달', async () => {
      const startDate = moment()
        .hour(0)
        .add(-1, 'months')
        .date(1)
        .format('YYYY-MM-DD')
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).format('YYYY-MM-DD')

      const result = await api.apiReportCount(startDate, endDate, 'month')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length + 4).toBeGreaterThanOrEqual(30)
      expect(result.length + 4).toBeLessThan(40)
      expect(result[0].date).toBe(startDate)
      expect(result[result.length - 1].date).toBe(endDate)
    })

    it('3개월', async () => {
      const startDate = moment().hour(0).add(-3, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiReportCount(startDate, endDate, '3-months')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(3)
      expect(result[0].date).toBe(startDate)
      expect(result[2].date).toBe(endDate)
    })

    it('6개월', async () => {
      const startDate = moment().hour(0).add(-6, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiReportCount(startDate, endDate, '6-months')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(6)
      expect(result[0].date).toBe(startDate)
      expect(result[5].date).toBe(endDate)
    })

    it('1년', async () => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .format('YYYY-MM')
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .format('YYYY-MM')

      const result = await api.apiReportCount(startDate, endDate, 'year')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(12)
      expect(result[0].date).toBe(startDate)
      expect(result[11].date).toBe(endDate)
    })
  })

  describe('apiSendLinkAndJoinCount', () => {
    it('일주일', async () => {
      const startDate = moment().hour(0).add(-7, 'days').format('YYYY-MM-DD')
      const endDate = moment().hour(0).add(-1, 'days').format('YYYY-MM-DD')

      const result = await api.apiSendLinkAndJoinCount(
        startDate,
        endDate,
        'week',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(7)
      expect(
        Object.keys(result[0]).some(
          (key) => key !== 'date' && key !== 'joinCount' && key !== 'sendCount',
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
    })

    it('한달', async () => {
      const startDate = moment()
        .hour(0)
        .add(-1, 'months')
        .date(1)
        .format('YYYY-MM-DD')
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).format('YYYY-MM-DD')

      const result = await api.apiSendLinkAndJoinCount(
        startDate,
        endDate,
        'month',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length + 4).toBeGreaterThanOrEqual(30)
      expect(result.length + 4).toBeLessThan(40)
      expect(result[0].date).toBe(startDate)
      expect(result[result.length - 1].date).toBe(endDate)
    })

    it('3개월', async () => {
      const startDate = moment().hour(0).add(-3, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiSendLinkAndJoinCount(
        startDate,
        endDate,
        '3-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(3)
      expect(result[0].date).toBe(startDate)
      expect(result[2].date).toBe(endDate)
    })

    it('6개월', async () => {
      const startDate = moment().hour(0).add(-6, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiSendLinkAndJoinCount(
        startDate,
        endDate,
        '6-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(6)
      expect(result[0].date).toBe(startDate)
      expect(result[5].date).toBe(endDate)
    })

    it('1년', async () => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .format('YYYY-MM')
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .format('YYYY-MM')

      const result = await api.apiSendLinkAndJoinCount(
        startDate,
        endDate,
        'year',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(12)
      expect(result[0].date).toBe(startDate)
      expect(result[11].date).toBe(endDate)
    })
  })

  it('apiMadamRequestStatusPerWeek', async () => {
    const result = await api.apiMadamRequestStatusPerWeek(
      moment().format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    )

    expect(result).not.toBeNull()
    if (!result) return

    expect(
      Object.keys(result).some((key) => !(key in MADAM_REQUEST_STATUS)),
    ).toBeFalsy()
    expect(
      Object.values(result).some((value) => typeof value !== 'number'),
    ).toBeFalsy()
  })

  describe('apiMadamRequestCount', () => {
    it('일주일', async () => {
      const startDate = moment().hour(0).add(-7, 'days').format('YYYY-MM-DD')
      const endDate = moment().hour(0).add(-1, 'days').format('YYYY-MM-DD')

      const result = await api.apiMadamRequestCount(startDate, endDate, 'week')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(7)
      expect(
        Object.keys(result[0]).some(
          (key) =>
            key !== 'date' &&
            key !== 'requestCount' &&
            key !== 'acceptCount' &&
            key !== 'rejectCount' &&
            key !== 'completeCount' &&
            key !== 'timeoutCount',
        ),
      ).toBeFalsy()
      expect(result[0].date).toBe(startDate)
      expect(result[6].date).toBe(endDate)
      expect(
        result
          .map((res) => res.requestCount)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
      expect(
        result
          .map((res) => res.acceptCount)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
      expect(
        result
          .map((res) => res.rejectCount)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
      expect(
        result
          .map((res) => res.completeCount)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
      expect(
        result
          .map((res) => res.timeoutCount)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
    })

    it('한달', async () => {
      const startDate = moment()
        .hour(0)
        .add(-1, 'months')
        .date(1)
        .format('YYYY-MM-DD')
      const end = moment().hour(0).toDate()
      const endDate = moment(
        new Date(end.getFullYear(), end.getMonth(), 0),
      ).format('YYYY-MM-DD')

      const result = await api.apiMadamRequestCount(startDate, endDate, 'month')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length + 4).toBeGreaterThanOrEqual(30)
      expect(result.length + 4).toBeLessThan(40)
      expect(result[0].date).toBe(startDate)
      expect(result[result.length - 1].date).toBe(endDate)
    })

    it('3개월', async () => {
      const startDate = moment().hour(0).add(-3, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiMadamRequestCount(
        startDate,
        endDate,
        '3-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(3)
      expect(result[0].date).toBe(startDate)
      expect(result[2].date).toBe(endDate)
    })

    it('6개월', async () => {
      const startDate = moment().hour(0).add(-6, 'months').format('YYYY-MM')
      const endDate = moment().hour(0).add(-1, 'months').format('YYYY-MM')

      const result = await api.apiMadamRequestCount(
        startDate,
        endDate,
        '6-months',
      )

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(6)
      expect(result[0].date).toBe(startDate)
      expect(result[5].date).toBe(endDate)
    })

    it('1년', async () => {
      const startDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(0)
        .format('YYYY-MM')
      const endDate = moment()
        .hour(0)
        .date(0)
        .add(-1, 'years')
        .month(11)
        .format('YYYY-MM')

      const result = await api.apiMadamRequestCount(startDate, endDate, 'year')

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.length).toBe(12)
      expect(result[0].date).toBe(startDate)
      expect(result[11].date).toBe(endDate)
    })
  })

  describe('apiPointsPerMadam', () => {
    it('4개', async () => {
      const result = await api.apiPointsPerMadam(0, 4)

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.data.length).toBe(4)
      expect(
        Object.keys(result.data[0]).some(
          (key) => key !== 'madam' && key !== 'point',
        ),
      ).toBeFalsy()
      expect(
        result.data
          .map((res) => res.madam)
          .some((res) => typeof res !== 'string'),
      ).toBeFalsy()
      expect(
        result.data
          .map((res) => res.point)
          .some((res) => typeof res !== 'number'),
      ).toBeFalsy()
    })

    it('10개', async () => {
      const result = await api.apiPointsPerMadam(0, 10)

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.data.length).toBe(10)
    })

    it('20개', async () => {
      const result = await api.apiPointsPerMadam(0, 20)

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.data.length).toBe(20)
    })

    it('30개', async () => {
      const result = await api.apiPointsPerMadam(0, 30)

      expect(result).not.toBeNull()
      if (!result) return

      expect(result.data.length).toBe(30)
    })
  })

  it('apiUserCountPerGender', async () => {
    const result = await api.apiUserCountPerGender()

    expect(result).not.toBeNull()
    if (!result) return

    expect(Object.keys(result).some((key) => !(key in GENDER))).toBeFalsy()
    expect(
      Object.values(result).some((value) => typeof value !== 'number'),
    ).toBeFalsy()
  })

  it('apiUserCountPerGender', async () => {
    const result = await api.apiUserCountPerGender()

    expect(result).not.toBeNull()
    if (!result) return

    expect(Object.keys(result).some((key) => !(key in GENDER))).toBeFalsy()
    expect(
      Object.values(result).some((value) => typeof value !== 'number'),
    ).toBeFalsy()
  })

  it('apiUserCountPerSexualPreference', async () => {
    const result = await api.apiUserCountPerSexualPreference()

    expect(result).not.toBeNull()
    if (!result) return

    expect(
      Object.keys(result).some((key) => !(key in SEXUAL_PREFERENCE)),
    ).toBeFalsy()
    expect(
      Object.values(result).some((value) => typeof value !== 'number'),
    ).toBeFalsy()
  })
})
