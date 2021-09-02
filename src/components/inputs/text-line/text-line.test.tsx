import { fireEvent, render } from '@testing-library/react'
import InputTextLine from './text-line.component'

describe('input.textLine 테스트', () => {
  it('display', () => {
    const { getByTestId } = render(<InputTextLine />)

    const input = getByTestId('input.textLine.input')

    expect(input).toBeTruthy()
  })

  it('비활성화', () => {
    const onFocus = jest.fn()

    const { getByTestId } = render(<InputTextLine onFocus={onFocus} disabled />)
    const input = getByTestId('input.textLine.input')

    fireEvent.click(input)

    setTimeout(() => {
      expect(onFocus).not.toHaveBeenCalled()
    }, 100)
  })

  it('changeText', () => {
    const { getByTestId } = render(<InputTextLine />)

    const input = getByTestId('input.textLine.input')

    fireEvent.change(input, { target: { value: 'a' } })

    setTimeout(() => {
      const newInput = getByTestId('input.textLine.input')

      expect(newInput.nodeValue).toBe('a')

      const close = getByTestId('input.textLine.close')

      expect(close).toBeInTheDocument()

      fireEvent.click(close)

      const blankInput = getByTestId('input.textLine.input')

      expect(blankInput.nodeValue).toBe('')
    }, 100)
  })
})
