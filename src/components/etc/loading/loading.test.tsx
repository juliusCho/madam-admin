import { render } from '@testing-library/react'
import Loading from './loading.component'

describe('loading test', () => {
  it('display', () => {
    const { getByTestId } = render(<Loading loading />)

    const icon = getByTestId('components.etc.loading.icon')

    expect(icon).toBeTruthy()
  })
})
