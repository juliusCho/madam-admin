import endpoints from '~/endpoints.config'
import api from '.'

describe('API apiSession', () => {
  let token = ''

  beforeAll(async () => {
    token = (await api.apiLogin(endpoints.test.uid)) ?? ''
  })

  afterAll(() => {
    api.apiLogout()
  })

  it('apiGetAdminInfo', async () => {
    const result = await api.apiGetAdminInfo(token, endpoints.test.uid)

    expect(result.uid).toBe(endpoints.test.uid)
    expect(result.email).toMatch(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  })
})
