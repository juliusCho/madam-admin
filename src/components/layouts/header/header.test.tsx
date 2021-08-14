import { render } from '@testing-library/react'
import React from 'react'
import { LayoutHeader } from '.'

describe('Components LayoutHeader', () => {
  it('display', () => {
    const { getByText } = render(<LayoutHeader />)

    const changeNameButton = getByText('사용자 명 변경')
    const logoutButton = getByText('로그아웃')

    expect(changeNameButton).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  })
})
