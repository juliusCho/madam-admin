import { render } from '@testing-library/react'
import moment from 'moment'
import DatePicker from './date-picker.component'

describe('Modal DatePicker', () => {
  describe('하루 일자 선택', () => {
    it('일자만 선택', () => {
      const changeDate = jest.fn()
      const { getByTestId } = render(
        <DatePicker changeDate={changeDate} isOpen />,
      )

      const exterior = getByTestId('calendarPeriod.exterior')
      const container = getByTestId('calendarPeriod.container')

      expect(exterior).toBeTruthy()
      expect(container).toBeTruthy()

      setTimeout(() => {
        expect(container).toHaveStyle('height: 23.75rem')
      }, 300)
    })

    it('월 선택', () => {
      const changeDate = jest.fn()
      const { getByTestId } = render(
        <DatePicker changeDate={changeDate} isOpen datePick={false} />,
      )

      setTimeout(() => {
        const exterior = getByTestId('calendarPeriod.exterior')
        const container = getByTestId('calendarPeriod.container')

        expect(exterior).toBeTruthy()
        expect(container).toBeTruthy()
        expect(container).toHaveStyle('height: 21.875rem')
      }, 300)
    })

    it('일자 범위 선택', () => {
      const changeDate = jest.fn()
      const { getByTestId } = render(
        <DatePicker changeDate={changeDate} isOpen selectRange />,
      )

      setTimeout(() => {
        const exterior = getByTestId('calendarPeriod.exterior')
        const container = getByTestId('calendarPeriod.container')

        expect(exterior).toBeTruthy()
        expect(container).toBeTruthy()
        expect(container).toHaveStyle('height: 28.125rem')
      }, 300)
    })

    it('일시 선택', () => {
      const changeDate = jest.fn()
      const { getByTestId } = render(
        <DatePicker
          changeDate={changeDate}
          isOpen
          timeDisplay
          date={new Date()}
        />,
      )

      setTimeout(() => {
        const exterior = getByTestId('calendarPeriod.exterior')
        const container = getByTestId('calendarPeriod.container')
        const timeValue = getByTestId('calendarPeriod.timepicker')
        const timeButton = getByTestId('calendarPeriod.timepicker-button')

        expect(exterior).toBeTruthy()
        expect(container).toBeTruthy()
        expect(timeValue).toBeTruthy()
        expect(timeButton).toBeTruthy()

        const displayDate = moment(new Date()).format('YYYY/MM/DD')
        expect(timeValue).toHaveTextContent(displayDate)
      }, 300)
    })

    it('시간 범위 선택', () => {
      const changeDate = jest.fn()

      const { getByTestId } = render(
        <DatePicker
          changeDate={changeDate}
          isOpen
          timeDisplay
          timeRange
          date={new Date()}
        />,
      )

      setTimeout(() => {
        const exterior = getByTestId('calendarPeriod.exterior')
        const container = getByTestId('calendarPeriod.container')
        const time1Value = getByTestId('calendarPeriod.timepicker1')
        const time1Button = getByTestId('calendarPeriod.timepicker1-button')
        const time2Value = getByTestId('calendarPeriod.timepicker2')
        const time2Button = getByTestId('calendarPeriod.timepicker2-button')

        expect(exterior).toBeTruthy()
        expect(container).toBeTruthy()
        expect(time1Value).toBeTruthy()
        expect(time1Button).toBeTruthy()
        expect(time2Value).toBeTruthy()
        expect(time2Button).toBeTruthy()

        const displayDate = moment(new Date()).format('YYYY/MM/DD')
        expect(time1Value).toHaveTextContent(displayDate)
        expect(time2Value).toHaveTextContent(displayDate)
      }, 300)
    })

    it('일시 범위 선택', () => {
      const changeDate = jest.fn()
      const date2 = new Date()
      date2.setDate(date2.getDate() + 1)

      const { getByTestId } = render(
        <DatePicker
          changeDate={changeDate}
          isOpen
          timeDisplay
          timeRange
          date={[new Date(), date2]}
        />,
      )

      setTimeout(() => {
        const exterior = getByTestId('calendarPeriod.exterior')
        const container = getByTestId('calendarPeriod.container')
        const time1Value = getByTestId('calendarPeriod.timepicker1')
        const time1Button = getByTestId('calendarPeriod.timepicker1-button')
        const time2Value = getByTestId('calendarPeriod.timepicker2')
        const time2Button = getByTestId('calendarPeriod.timepicker2-button')

        expect(exterior).toBeTruthy()
        expect(container).toBeTruthy()
        expect(time1Value).toBeTruthy()
        expect(time1Button).toBeTruthy()
        expect(time2Value).toBeTruthy()
        expect(time2Button).toBeTruthy()

        const displayDate1 = moment(new Date()).format('YYYY/MM/DD')
        const displayDate2 = moment(date2).format('YYYY/MM/DD')
        expect(time1Value).toHaveTextContent(displayDate1)
        expect(time2Value).toHaveTextContent(displayDate2)
      }, 300)
    })
  })
})
