import { ROUTER_PATH } from '~/constants/etc'
import { renderPage } from '~/__fixtures__'
import DashboardUser from './user.component'

describe('Page DashboardUser', () => {
  const { getByText } = renderPage(ROUTER_PATH.DASHBOARD.USER, DashboardUser)

  it('display', () => {
    setTimeout(() => {
      const genderChartTitle = getByText('사용자 남/여 비율')
      const sexualPreferenceChartTitle = getByText('이성/동성/양성애자 비율')
      const countryChartTitle = getByText('국가 비율')
      const interestChartTitle = getByText('관심사 별 비율')
      const hateChartTitle = getByText('싫어요 별 비율')

      expect(genderChartTitle).toBeInTheDocument()
      expect(sexualPreferenceChartTitle).toBeInTheDocument()
      expect(countryChartTitle).toBeInTheDocument()
      expect(interestChartTitle).toBeInTheDocument()
      expect(hateChartTitle).toBeInTheDocument()
    }, 1000)
  })
})
