import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ChartBarLine from './bar-line.component'

describe('Component ChartBarLine', () => {
  describe('display & call picker', () => {
    const onChange = jest.fn()

    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <ChartBarLine
          title="타이틀"
          data={[
            ['일자', 'data1', 'data2'],
            ['2021-03', 134, 2],
            ['2021-04', 243, 13],
            ['2021-05', 334, 4],
            ['2021-06', 347, 52],
            ['2021-07', 389, 32],
            ['2021-08', 1583, 149],
          ]}
          dateSearch={{
            type: '6-months',
            onChange,
            format: 'YYYY-MM',
          }}
          lineColumnIdx={1}
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
      }, 300)
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
        <ChartBarLine
          title="타이틀"
          data={[
            ['일자', 'data1', 'data2'],
            ['2021-03', 134, 2],
            ['2021-04', 243, 13],
            ['2021-05', 334, 4],
            ['2021-06', 347, 52],
            ['2021-07', 389, 32],
            ['2021-08', 1583, 149],
          ]}
          dateSearch={{
            type: '6-months',
            onChange,
            format: 'YYYY-MM',
            maxDate: new Date(),
            date: new Date(),
          }}
          lineColumnIdx={1}
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
