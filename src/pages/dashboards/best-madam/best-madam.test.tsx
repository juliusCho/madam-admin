import { ROUTER_PATH } from '~/constants/etc'
import { renderPage } from '~/__fixtures__'
import DashboardBestMadam from './best-madam.component'

describe('Page DashboardBestMadam', () => {
  const { getByText } = renderPage(
    ROUTER_PATH.DASHBOARD.BEST_MADAM,
    DashboardBestMadam,
  )

  it('display', () => {
    setTimeout(() => {
      const madamPointTitle = getByText('최고의 마담별 포인트 수')
      const requestCountTitle = getByText('소개팅 요청별 의뢰 상태')
      const requestStatusTitle = getByText('주별 소개팅 의뢰상태별 비율')

      expect(madamPointTitle).toBeInTheDocument()
      expect(requestCountTitle).toBeInTheDocument()
      expect(requestStatusTitle).toBeInTheDocument()
    }, 1000)
  })
})
