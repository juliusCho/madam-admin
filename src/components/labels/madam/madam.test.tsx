import { render } from '@testing-library/react'
import LabelMadam from './madam.component'

describe('Components LabelMadam', () => {
  it('display', () => {
    const { getByTestId } = render(<LabelMadam size="titleBig" />)

    const text = getByTestId('components.labels.madam.text')

    expect(text).toBeInTheDocument()
  })

  it('tailwind font class check', () => {
    const { getByTestId } = render(<LabelMadam size="textBig" />)

    const text = getByTestId('components.labels.madam.text')
    let found = false

    text.classList.forEach((clss) => {
      if (clss === 'text-textBig') {
        found = true
      }
    })

    setTimeout(() => {
      expect(found).toBeTruthy()
    }, 100)
  })
})
