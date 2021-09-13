import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ChartDonut from './donut.component'

describe('Component ChartDonut', () => {
  const { getByText } = render(
    <RecoilRoot>
      <ChartDonut
        title="타이틀"
        data={[
          ['label', 'count'],
          ['test1', 1],
          ['test2', 2],
          ['test3', 3],
        ]}
        centerText={[{ text: '가운데' }, { text: '텍스트', bold: true }]}
      />
    </RecoilRoot>,
  )
  it('display', () => {
    const title = getByText('타이틀')
    const centerTextTop = getByText('가운데')
    const centerTextBottom = getByText('텍스트')

    expect(title).toBeInTheDocument()
    expect(centerTextTop).toBeInTheDocument()
    expect(centerTextBottom).toBeInTheDocument()
  })
})
