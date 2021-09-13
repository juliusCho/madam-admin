import { ROUTER_PATH } from '../../../constants'
import { renderPage } from '../../../__fixtures__'
import DashboardAppUse from './app-use.component'

describe('Page DashboardAppUse', () => {
  const { getByText } = renderPage(
    ROUTER_PATH.DASHBOARD.APP_USE,
    DashboardAppUse,
  )

  it('display', () => {
    setTimeout(() => {
      const pieChartTitle = getByText('사용자 상태별 비율')
      const connectChartTitle = getByText('신규 가입 / 탈퇴 수')
      const reportChartTitle = getByText('신고 / 차단 수')
      const inviteChartTitle = getByText(
        '초대링크 발송 수 대비\n링크를 통한 가입 수',
      )

      expect(pieChartTitle).toBeInTheDocument()
      expect(connectChartTitle).toBeInTheDocument()
      expect(reportChartTitle).toBeInTheDocument()
      expect(inviteChartTitle).toBeInTheDocument()
    }, 1000)
  })
})
