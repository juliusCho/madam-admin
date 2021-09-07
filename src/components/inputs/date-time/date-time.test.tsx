import { render } from '@testing-library/react'
import InputDateTime from './date-time.component'

describe('input.dateTime 테스트', () => {
  it('display', () => {
    const onChange = jest.fn()

    const { getByTestId } = render(<InputDateTime onChange={onChange} />)

    const button = getByTestId('input.dateTime.button')
    const input = getByTestId('input.dateTime.input')

    expect(button).toBeTruthy()
    expect(input).toBeTruthy()
  })

  it('비활성화', () => {
    const onChange = jest.fn()

    const { getByText } = render(
      <InputDateTime onChange={onChange} disabled disabledText="비활성화" />,
    )

    const input = getByText('비활성화')

    expect(input).toBeTruthy()
  })
})
