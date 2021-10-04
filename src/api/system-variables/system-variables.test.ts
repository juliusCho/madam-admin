import apiSession from '~/api/session'
import PageNation from '~/classes/page-nation'
import endpoints from '~/endpoints.config'
import api from '.'

describe('API SystemVariables', () => {
  let token = ''

  beforeAll(async () => {
    token = (await apiSession.apiLogin(endpoints.test.uid)) ?? ''
  })

  afterAll(() => {
    apiSession.apiLogout()
  })

  describe('apiGetProfileExtraItems', () => {
    it('전체 조회', async () => {
      const result = await api.apiGetProfileExtraItems(
        token,
        new PageNation(10, 1),
      )

      expect(result).not.toBeNull()
    })
  })
})
