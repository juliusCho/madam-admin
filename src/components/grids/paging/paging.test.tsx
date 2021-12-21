import { fireEvent, render, screen } from '@testing-library/react'
import GridPaging from './paging.component'

describe('Component GridPaging 테스트', () => {
  let page = 2
  const onChange = jest.fn((type: 'prev' | 'next') => {
    if (type === 'prev') {
      page -= 1
    } else {
      page += 1
    }
  })

  render(<GridPaging page={page} onChange={onChange} totalPage={10} />)

  const initLabel = screen.getByText('Page: 2 / 10')
  const prevBtn = screen.getByTestId('components.grids.paging.prevBtn')
  const nextBtn = screen.getByTestId('components.grids.paging.nextBtn')

  it("test component's displaying features", () => {
    expect(initLabel).toBeInTheDocument()
    expect(prevBtn).toBeInTheDocument()
    expect(nextBtn).toBeInTheDocument()
  })

  it('check onChange event', () => {
    fireEvent.click(prevBtn)

    setTimeout(() => {
      expect(onChange).toHaveBeenCalled()
      expect(page).toBe(1)

      const againPrevBtn = screen.queryByTestId(
        'components.grids.paging.prevBtn',
      )
      expect(againPrevBtn).toBeNull()

      fireEvent.click(nextBtn)
      fireEvent.click(nextBtn)

      setTimeout(() => {
        expect(onChange).toHaveBeenCalledTimes(3)
        expect(page).toBe(3)

        const againAgainPrevBtn = screen.getByTestId(
          'components.grids.paging.prevBtn',
        )
        expect(againAgainPrevBtn).toBeInTheDocument()
      }, 100)
    }, 100)
  })
})
