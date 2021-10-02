import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ChartLineByDataset from './line-by-dataset.component'

describe('Component ChartLineByDataset', () => {
  const onChangeDisplayDataCount = jest.fn()
  const onClickPrev = jest.fn()
  const onClickNext = jest.fn()

  const { getByText, getByTestId } = render(
    <RecoilRoot>
      <ChartLineByDataset
        title="타이틀"
        data={[
          [
            { type: 'string', label: 'column1' },
            { type: 'number', label: 'column2' },
          ],
          ['data1', 1],
          ['data2', 2],
          ['data3', 3],
        ]}
        displayCounts={[3, 5, 10]}
        onChangeDisplayDataCount={onChangeDisplayDataCount}
        prev={{ onClick: onClickPrev }}
        next={{ onClick: onClickNext }}
      />
    </RecoilRoot>,
  )

  const title = getByText('타이틀')
  const prevButton = getByTestId('components.buttons.prevNext.prevButton')
  const nextButton = getByTestId('components.buttons.prevNext.nextButton')

  it('display', () => {
    expect(title).toBeInTheDocument()
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  xit('next button 비활성화', () => {
    fireEvent.click(nextButton)

    setTimeout(() => {
      expect(onClickNext).not.toHaveBeenCalled()
    }, 100)
  })
})
