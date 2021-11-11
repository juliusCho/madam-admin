import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ChartBar from './bar.component'

describe('Component ChartBar', () => {
  describe('display & call picker', () => {
    const onChange = jest.fn()

    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <ChartBar
          title="타이틀"
          data={[
            ['일자', 'data'],
            ['2021-03', 134],
            ['2021-04', 243],
            ['2021-05', 334],
            ['2021-06', 347],
            ['2021-07', 389],
            ['2021-08', 1583],
          ]}
          dateSearch={{
            type: '6-months',
            onChange,
            format: 'YYYY-MM',
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
        <ChartBar
          title="타이틀"
          data={[
            ['일자', 'data'],
            ['2021-03', 134],
            ['2021-04', 243],
            ['2021-05', 334],
            ['2021-06', 347],
            ['2021-07', 389],
            ['2021-08', 1583],
          ]}
          dateSearch={{
            type: '6-months',
            onChange,
            format: 'YYYY-MM',
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
