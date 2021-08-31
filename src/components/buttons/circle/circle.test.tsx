import { fireEvent, render } from '@testing-library/react'
import { ButtonCircle } from '.'

describe('Components - ButtonCircle', () => {
  it('display', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ButtonCircle onClick={onClick}>test</ButtonCircle>,
    )

    const button = getByTestId('components.buttons.circle.button')
    const p = getByTestId('components.buttons.circle.text')

    expect(button).toBeInTheDocument()
    expect(p).toBeInTheDocument()
  })

  it('onClick', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ButtonCircle onClick={onClick}>test</ButtonCircle>,
    )

    const button = getByTestId('components.buttons.circle.button')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})

export {}
