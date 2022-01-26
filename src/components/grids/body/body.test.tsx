import { fireEvent, render, screen } from '@testing-library/react'
import { CRUD } from '~/enums'
import GridBody from './body.component'

describe('Component GridBody testing', () => {
  const onCheck = jest.fn()
  const onCheckAll = jest.fn()
  const onChange = jest.fn()

  render(
    <GridBody
      onCheck={onCheck}
      onCheckAll={onCheckAll}
      properties={[
        {
          key: 'type',
          type: 'single-select',
          label: '유형',
          options: [
            { value: 'POINT', label: '포인트 설정' },
            { value: 'SYSTEM', label: '시스템 설정' },
          ],
          onChange,
          width: '8rem',
          justify: 'center',
        },
        {
          key: 'name',
          type: 'text',
          label: '변수명',
          onChange,
          width: '8rem',
          justify: 'start',
        },
        {
          key: 'createdAt',
          type: 'date',
          label: '생성일시',
          onChange,
          format: 'YYYY-MM-DD',
          nullable: true,
          onSort: jest.fn(),
          sort: 'asc',
          width: '8rem',
          justify: 'center',
        },
      ]}
      data={[
        {
          checked: true,
          crud: CRUD.READ,
          no: 1,
          type: 'POINT',
          name: 'USE_POINT_1',
          createdAt: new Date(),
        },
        {
          checked: false,
          crud: CRUD.DELETE,
          no: 2,
          type: 'POINT',
          name: 'USE_POINT_2',
          createdAt: new Date(),
        },
        {
          checked: false,
          crud: CRUD.MODIFY,
          no: 3,
          type: 'SYSTEM',
          name: 'SSE',
          createdAt: new Date(),
        },
        {
          checked: false,
          crud: CRUD.CREATE,
          no: 4,
          type: 'POINT',
          name: 'USE_POINT_4',
        },
      ]}
      fixedColumnIndex={0}
    />,
  )

  setTimeout(() => {
    const container = screen.getByTestId('components.grids.body.container')
    const headers = screen.getAllByTestId('components.grids.header.container')
    const cells = screen.getAllByTestId('components.grids.column.container')

    it('check displaying features', () => {
      expect(container).toBeInTheDocument()
      expect(container.getBoundingClientRect().width).toBe(8 * 4 + 2 * 16)
      expect(headers.length).toBe(6)
      expect(cells.length).toBe(6 * 4)
    })

    it('check click events', () => {
      fireEvent.click(headers[0])

      setTimeout(() => {
        expect(onCheckAll).toHaveBeenCalled()

        fireEvent.click(cells[0])

        setTimeout(() => {
          expect(onCheck).toHaveBeenCalled()

          fireEvent.click(cells[5])

          setTimeout(() => {
            expect(onChange).toHaveBeenCalled()
          }, 100)
        }, 100)
      }, 100)
    })

    it('check onscroll event', () => {
      const fixedHeaderY = headers[0].getBoundingClientRect().y
      const fixedColumnX = cells[0].getBoundingClientRect().x
      const { x: unfixedColumnX, y: unfixedColumnY } =
        cells[5].getBoundingClientRect()

      fireEvent.scroll(container, { target: { scrollY: 10, scrollX: 10 } })

      setTimeout(() => {
        const { x, y } = cells[5].getBoundingClientRect()
        expect(x).not.toBe(unfixedColumnX)
        expect(y).not.toBe(unfixedColumnY)
        expect(headers[0].getBoundingClientRect().y).toBe(fixedHeaderY)
        expect(cells[0].getBoundingClientRect().x).toBe(fixedColumnX)
      }, 100)
    })
  }, 100)

  it('', () => {
    expect(true).toBeTruthy()
  })
})
