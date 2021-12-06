import { fireEvent, render } from '@testing-library/react'
import { ButtonBasic } from '.'

describe('Components - ButtonBasic', () => {
  it('display', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ButtonBasic onClick={onClick}>test</ButtonBasic>,
    )

    const button = getByTestId('components.buttons.basic.button')
    const p = getByTestId('components.buttons.basic.text')

    expect(button).toBeInTheDocument()
    expect(p).toBeInTheDocument()
  })

  it('onClick', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ButtonBasic onClick={onClick}>test</ButtonBasic>,
    )

    const button = getByTestId('components.buttons.basic.button')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})

export {}
