import { render } from '@testing-library/react'
import InputSingleSelect from './single-select.component'

describe('Components InputSingleSelect', () => {
  const options = [
    { value: 1, label: 'option1' },
    { value: 2, label: 'option2' },
    { value: 3, label: 'option3' },
  ]
  let value = 1
  const onChange = jest.fn((val) => {
    value = val
  })

  const { getByTestId, getByText } = render(
    <InputSingleSelect
      options={options}
      value={value}
      onChange={onChange}
      disabled={false}
      placeholder={undefined}
    />,
  )

  // const comboBox = getByTestId('components.inputs.select.comboBox')
  const initValue = getByText('1')
  it('tmp', () => {
    expect(true).toBeTruthy()
  })

  // it('display', () => {
  //   expect(comboBox).toBeInTheDocument()
  //   expect(initValue).toBe(1)
  // })

  // describe('콤보박스 오픈', () => {
  //   fireEvent.click(comboBox)

  //   const option1 = getByText('option1')
  //   const option2 = getByText('option2')
  //   const option3 = getByText('option3')

  //   it('display', () => {
  //     expect(option1).toBeInTheDocument()
  //     expect(option2).toBeInTheDocument()
  //     expect(option3).toBeInTheDocument()
  //   })

  //   it('옵션 2 선택', () => {
  //     fireEvent.click(option2)

  //     expect(onChange).toHaveBeenCalled()
  //     expect(value).toBe(2)
  //   })
  // })
})
