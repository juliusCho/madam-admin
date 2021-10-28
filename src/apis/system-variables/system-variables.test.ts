import api from '.'

describe('API SystemVariables', () => {
  describe('apiGetProfileExtraItems', () => {
    it('전체 조회', async () => {
      const result = await api.apiGetProfileExtraItems({
        size: 10,
        page: 1,
      })

      expect(result).not.toBeNull()
    })
  })
})
