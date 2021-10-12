import apiSession from '~/api/session'
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
      const result = await api.apiGetProfileExtraItems(token, {
        size: 10,
        page: 1,
      })

      expect(result).not.toBeNull()
    })
  })
})
