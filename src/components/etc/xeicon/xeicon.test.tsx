import { render } from '@testing-library/react'
import XEIcon from './xeicon.component'

describe('XEIcon 테스트', () => {
  it('display test', () => {
    const { getByTestId } = render(
      <XEIcon
        name="angle-down"
        size={10}
        color="text-mono-black hover:text-mono-blackHover active:text-mono-blackActive"
        testID="test"
      />,
    )

    const icon = getByTestId('test')

    expect(icon).not.toEqual(null)
  })
})
