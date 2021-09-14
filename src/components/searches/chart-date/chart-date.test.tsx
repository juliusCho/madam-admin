import { fireEvent, render } from '@testing-library/react'
import moment from 'moment'
import { RecoilRoot } from 'recoil'
import SearchChartDate from './chart-date.component'

describe('Component SearchChartDate', () => {
  describe('no limit', () => {
    let date = new Date()
    const onChange = jest.fn((changedDate) => {
      date = changedDate
    })

    const { getByTestId } = render(
      <RecoilRoot>
        <SearchChartDate type="day" onChange={onChange} date={date} />
      </RecoilRoot>,
    )

    const caller = getByTestId('components.searches.chartDate.pickerCaller')
    const prevButton = getByTestId('components.buttons.prevNext.prevButton')
    const nextButton = getByTestId('components.buttons.prevNext.nextButton')

    it('display', () => {
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

      setTimeout(() => {
        expect(onChange).toHaveBeenCalled()

        expect(moment(date).format('YYYYMMDD')).toBe(
          moment().add('days', 1).format('YYYYMMDD'),
        )
      }, 100)
    })
  })

  it('next button 비활성화', () => {
    const onChange = jest.fn()

    const { getByTestId } = render(
      <RecoilRoot>
        <SearchChartDate
          type="day"
          onChange={onChange}
          date={new Date()}
          maxDate={new Date()}
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
