import { fireEvent } from '@testing-library/dom'
import { ROUTER_PATH } from '~/constants/etc'
import { renderPage } from '~/__fixtures__'
import { PageLogin } from '.'

describe('Pages Login', () => {
  const { getByTestId, getByText } = renderPage(ROUTER_PATH.LOGIN, PageLogin)
  const button = getByTestId('components.buttons.circle.button')

  it('display', async () => {
    const title = getByTestId('components.labels.madam.text')
    const p = getByTestId('components.buttons.circle.text')
    const buttonLabel = getByText('Login')

    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(p).toBeInTheDocument()
    expect(p).toStrictEqual(buttonLabel)
  })

  it('click login button', () => {
    fireEvent.click(button)

    setTimeout(() => {
      expect(global.document.hasFocus()).toBeFalsy()
    }, 300)
  })
})
