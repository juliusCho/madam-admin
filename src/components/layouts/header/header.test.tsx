import { fireEvent, render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Swal from 'sweetalert2'
import { LayoutHeader } from '.'

describe('Components LayoutHeader', () => {
  const fire = jest.spyOn(Swal, 'fire')

  const { getByText, getByTestId } = render(
    <RecoilRoot>
      <LayoutHeader />
    </RecoilRoot>,
  )

  const changeNameButton = getByText('사용자 명 변경')
  const logoutButton = getByText('로그아웃')

  it('display', () => {
    expect(changeNameButton).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  })

  describe('change name', () => {
    fireEvent.click(changeNameButton)

    setTimeout(() => {
      const input = getByTestId('components.layouts.header.changeName.input')
      const cancelButton = getByTestId('components.modals.content.cancelButton')
      const confirmButton = getByTestId(
        'components.modals.content.confirmButton',
      )

      it('display', () => {
        expect(input).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
        expect(confirmButton).toBeInTheDocument()
      })

      it('cancelButton', () => {
        fireEvent.click(cancelButton)

        const newInput = getByTestId(
          'components.layouts.header.changeName.input',
        )

        expect(newInput).not.toBeInTheDocument()

        fireEvent.click(changeNameButton)
      })

      it('confirmButton', () => {
        fireEvent.click(confirmButton)

        expect(fire).toHaveBeenCalled()
      })
    }, 500)
  })

  describe('logout', () => {
    fireEvent.click(logoutButton)

    expect(fire).toHaveBeenCalled()
  })
})
