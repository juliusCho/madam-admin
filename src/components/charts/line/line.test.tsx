import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ChartLine from './line.component'

describe('Component ChartLine', () => {
  describe('display & call picker', () => {
    const onChange = jest.fn()

    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <ChartLine
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
          dateSearch={{
            type: 'day',
            onChange,
            format: 'YYYY-MM-DD',
          }}
        />
      </RecoilRoot>,
    )

    const title = getByText('타이틀')
    const caller = getByTestId('components.searches.chartDate.pickerCaller')
    const prevButton = getByTestId('components.buttons.prevNext.prevButton')
    const nextButton = getByTestId('components.buttons.prevNext.nextButton')

    it('display', () => {
      expect(title).toBeInTheDocument()
      expect(caller).toBeInTheDocument()
      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })

    it('call picker', () => {
      fireEvent.click(caller)

      setTimeout(() => {
        const picker = getByTestId('calendarPeriod.container')
        expect(picker).toBeInTheDocument()
      }, 399)
    })

    it('change date', () => {
      fireEvent.click(prevButton)
      fireEvent.click(nextButton)

      setTimeout(() => {
        expect(onChange).toHaveBeenCalledTimes(2)
      }, 100)
    })
  })

  it('next button 비활성화', () => {
    const onChange = jest.fn()

    const { getByTestId } = render(
      <RecoilRoot>
        <ChartLine
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
          dateSearch={{
            type: 'day',
            onChange,
            format: 'YYYY-MM-DD',
            maxDate: new Date(),
            date: new Date(),
          }}
        />
      </RecoilRoot>,
    )

    const nextButton = getByTestId('components.buttons.prevNext.nextButton')

    fireEvent.click(nextButton)

    setTimeout(() => {
      expect(onChange).not.toHaveBeenCalled()
    }, 100)
  })
})
