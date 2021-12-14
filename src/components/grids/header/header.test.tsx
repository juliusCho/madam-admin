import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import GridHeader from './header.component'

describe('Components GridHeader 테스트', () => {
  afterEach(cleanup)

  describe('일반 타입', () => {
    const { getByText, unmount } = render(<GridHeader>일반</GridHeader>)

    const label = getByText('일반')

    it('구성요소를 검사한다', () => {
      expect(label).toBeInTheDocument()
      expect(label.classList.contains('bg-mono-lightGray')).toBeTruthy()
      expect(label.classList.contains('text-mono-black')).toBeTruthy()
      expect(label.classList.contains('border')).toBeTruthy()
      expect(label.classList.contains('border-solid')).toBeTruthy()
      expect(label.classList.contains('border-mono-black')).toBeTruthy()

      unmount()
      cleanup()
    })
  })

  describe('Sortable 타입', () => {
    let sort: undefined | 'asc' | 'desc'
    const onClick = jest.fn(() => {
      if (sort) {
        sort = sort === 'asc' ? 'desc' : undefined
      } else {
        sort = undefined
      }
    })

    const { getByText, unmount } = render(
      <GridHeader sort={sort} sortable onClick={onClick}>
        유형
      </GridHeader>,
    )

    const label = getByText('유형')

    it('클릭 이벤트를 검사한다', () => {
      fireEvent.click(label)

      setTimeout(() => {
        expect(onClick).toHaveBeenCalled()

        expect(sort).toBe('asc')

        const arrow = screen.getByTestId('components.grids.header.sort-arrow')

        expect(arrow).toBeInTheDocument()
        expect(arrow.classList.contains('xi-arrow-up')).toBeTruthy()
        expect(arrow.classList.contains('text-main-blue')).toBeTruthy()

        fireEvent.click(label)

        setTimeout(() => {
          expect(onClick).toHaveBeenCalledTimes(2)

          expect(sort).toBe('desc')

          const newArrow = screen.getByTestId(
            'components.grids.header.sort-arrow',
          )

          expect(newArrow.classList.contains('xi-arrow-down')).toBeTruthy()
          expect(newArrow.classList.contains('text-main-red')).toBeTruthy()

          fireEvent.click(label)

          setTimeout(() => {
            expect(onClick).toHaveBeenCalledTimes(3)

            expect(sort).toBeUndefined()

            unmount()
            cleanup()
          }, 100)
        }, 100)
      }, 100)
    })
  })

  describe('체크 타입', () => {
    let checked = false
    const onClick = jest.fn(() => {
      checked = !checked
    })

    const { getByTestId } = render(
      <GridHeader checked={checked} onClick={onClick} />,
    )

    setTimeout(() => {
      const container = getByTestId('components.grids.header.container')
      const checkbox = getByTestId('components.grids.header.checkbox')

      it('구성요소를 검사한다', () => {
        expect(container).toBeInTheDocument()
        expect(container.classList.contains('bg-mono-lightGray')).toBeTruthy()
        expect(container.classList.contains('border')).toBeTruthy()
        expect(container.classList.contains('border-solid')).toBeTruthy()
        expect(container.classList.contains('border-mono-black')).toBeTruthy()
        expect(checkbox).toBeInTheDocument()
        expect(checkbox.classList.contains('xi-checkbox-blank')).toBeTruthy()
        expect(checkbox.classList.contains('bg-mono-white')).toBeTruthy()
        expect(checkbox.classList.contains('text-mono-black')).toBeTruthy()
      })

      it('클릭이벤트를 검사한다', () => {
        fireEvent.click(container)

        setTimeout(() => {
          expect(onClick).toHaveBeenCalled()

          expect(checked).toBeTruthy()

          const newCheckbox = getByTestId('components.grids.header.checkbox')

          expect(
            newCheckbox.classList.contains('xi-check-square-o'),
          ).toBeTruthy()
        }, 100)
      })
    }, 100)
  })
})
