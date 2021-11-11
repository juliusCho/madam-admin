import { ROUTER_PATH } from '~/constants/etc'
import { renderPage } from '~/__fixtures__'
import DashboardEtc from './etc.component'

describe('Page DashboardEtc', () => {
  const { getByText } = renderPage(ROUTER_PATH.DASHBOARD.ETC, DashboardEtc)

  it('display', () => {
    setTimeout(() => {
      const charmChartTitle = getByText('포인트 플랜 당 누적 구매 수')
      const chatChartTitle = getByText('채팅 메세지 개수')
      const inquiryChartTitle = getByText('유형별 문의글 개수')

      expect(charmChartTitle).toBeInTheDocument()
      expect(chatChartTitle).toBeInTheDocument()
      expect(inquiryChartTitle).toBeInTheDocument()
    }, 1000)
  })
})
