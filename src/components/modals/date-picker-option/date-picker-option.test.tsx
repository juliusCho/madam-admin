import { fireEvent, render } from '@testing-library/react'
import { ChartDatePickerOption } from '../../../types'
import ModalDatePickerOption from './date-picker-option.component'

describe('Components ModalDatePickerOption', () => {
  let type: ChartDatePickerOption = 'day'
  const changeOption = jest.fn((changedType: ChartDatePickerOption) => {
    type = changedType
  })

  const { getByText } = render(
    <ModalDatePickerOption show changeOption={changeOption} type={type} />,
  )

  const day = getByText('하루')
  const week = getByText('일주일')
  const month = getByText('한달')
  const threeMonths = getByText('3달')
  const sixMonths = getByText('6달')
  const year = getByText('일년')

  it('display', () => {
    expect(day).toBeInTheDocument()
    expect(week).toBeInTheDocument()
    expect(month).toBeInTheDocument()
    expect(threeMonths).toBeInTheDocument()
    expect(sixMonths).toBeInTheDocument()
    expect(year).toBeInTheDocument()
  })

  it('onClick', () => {
    fireEvent.click(week)

    setTimeout(() => {
      expect(changeOption).toHaveBeenCalled()
      expect(type).toBe('week')
    }, 300)
  })
})
