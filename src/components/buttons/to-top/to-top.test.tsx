import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ButtonToTop from './to-top.component'

describe('Component ButtonToTop', () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <ButtonToTop show />
    </RecoilRoot>,
  )

  const button = getByTestId('components.buttons.toTop')

  it('display', () => {
    expect(button).toBeInTheDocument()
  })

  it('onClick', () => {
    fireEvent.click(button)

    const { body } = document
    const docEl = document.documentElement
    const doc = docEl.clientHeight ? docEl : body

    expect(doc.scrollTop).toBe(0)
  })
})
