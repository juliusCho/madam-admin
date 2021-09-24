import { fireEvent, render } from '@testing-library/react'
import ButtonPrevNext from './prev-next.component'

describe('Component ButtonPrevNext', () => {
  const onClickPrev = jest.fn()
  const onClickNext = jest.fn()

  describe('활성화', () => {
    it('display', () => {
      const { getByText } = render(
        <ButtonPrevNext
          next={{ onClick: onClickNext, label: 'prev' }}
          prev={{ onClick: onClickPrev, label: 'next' }}
        />,
      )

      const prev = getByText('prev')
      const next = getByText('next')

      expect(prev).toBeInTheDocument()
      expect(next).toBeInTheDocument()
    })

    it('onClick', () => {
      const { getByText } = render(
        <ButtonPrevNext
          next={{ onClick: onClickNext, label: 'prev' }}
          prev={{ onClick: onClickPrev, label: 'next' }}
        />,
      )

      const prev = getByText('prev')
      const next = getByText('next')

      fireEvent.click(prev)
      fireEvent.click(next)

      expect(onClickPrev).toHaveBeenCalled()
      expect(onClickNext).toHaveBeenCalled()
    })
  })

  describe('비활성화', () => {
    it('onClick', () => {
      const { getByText } = render(
        <ButtonPrevNext
          next={{ onClick: onClickNext, label: 'prev', disabled: true }}
          prev={{ onClick: onClickPrev, label: 'next', disabled: true }}
        />,
      )

      const prev = getByText('prev')
      const next = getByText('next')

      fireEvent.click(prev)
      expect(onClickPrev).not.toHaveBeenCalled()

      fireEvent.click(next)
      expect(onClickNext).not.toHaveBeenCalled()
    })
  })
})
