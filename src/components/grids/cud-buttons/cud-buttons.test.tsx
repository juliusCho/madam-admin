import { fireEvent, render, screen } from '@testing-library/react'
import GridCudButtons from './cud-buttons.component'

describe('Component GridCudButtons 테스트', () => {
  const onSave = jest.fn()
  const onCancel = jest.fn()
  const onAdd = jest.fn()
  const onDelete = jest.fn()

  render(
    <GridCudButtons
      onSave={onSave}
      onCancel={onCancel}
      onAdd={onAdd}
      onDelete={onDelete}
    />,
  )

  const save = screen.getByText('적용')
  const cancel = screen.getByText('취소')
  const add = screen.getByText('추가')
  const deleteBtn = screen.getByText('삭제')

  it('tests component displaying parts', () => {
    expect(save).toBeInTheDocument()
    expect(cancel).toBeInTheDocument()
    expect(add).toBeInTheDocument()
    expect(deleteBtn).toBeInTheDocument()
  })

  it('tests button onclick events', () => {
    fireEvent.click(save)

    setTimeout(() => {
      expect(onSave).toHaveBeenCalled()

      fireEvent.click(add)

      setTimeout(() => {
        expect(onAdd).toHaveBeenCalled()

        fireEvent.click(cancel)

        setTimeout(() => {
          expect(onCancel).toHaveBeenCalled()

          fireEvent.click(deleteBtn)

          setTimeout(() => {
            expect(onDelete).toHaveBeenCalled()
          }, 100)
        }, 100)
      }, 100)
    }, 100)
  })
})
