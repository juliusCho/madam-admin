import { ROUTER_PATH } from '~/constants/etc'
import { renderPage } from '~/__fixtures__'
import DashboardCoupling from './coupling.component'

describe('Page DashboardCoupling', () => {
  const { getByText } = renderPage(
    ROUTER_PATH.DASHBOARD.COUPLING,
    DashboardCoupling,
  )

  it('display', () => {
    setTimeout(() => {
      const coupleStatusChartTitle = getByText('소개팅 액션별 비율')
      const matchCountChartTitle = getByText('소개팅 횟수 대비 매칭 수')

      expect(coupleStatusChartTitle).toBeInTheDocument()
      expect(matchCountChartTitle).toBeInTheDocument()
    }, 1000)
  })
})
