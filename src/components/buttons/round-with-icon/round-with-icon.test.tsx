import { fireEvent, render, screen } from '@testing-library/react'
import ButtonRoundWithIcon from './round-with-icon.component'

describe('Components ButtonRoundWithIcon 테스트', () => {
  it('label display & onClick', () => {
    const onClick = jest.fn()

    render(
      <ButtonRoundWithIcon icon="close" active onClick={onClick}>
        텍스트
      </ButtonRoundWithIcon>,
    )

    const button = screen.getByText('텍스트')

    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })

  it('비 활성화 상태', () => {
    const onClick = jest.fn()

    render(
      <ButtonRoundWithIcon
        icon="close"
        disabled
        onClick={onClick}
        disabledChildren="비활성화">
        가운데 정렬 테스트
      </ButtonRoundWithIcon>,
    )

    const button = screen.getByText('비활성화')

    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })
})
