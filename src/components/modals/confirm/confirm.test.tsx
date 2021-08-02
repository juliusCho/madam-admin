import { render } from '@testing-library/react'
import React from 'react'
import Swal from 'sweetalert2'
import Confirm from './confirm.component'

it('확인 창 테스트', () => {
  const fire = jest.spyOn(Swal, 'fire')
  const onConfirm = jest.fn()
  const onCancel = jest.fn()

  render(
    <Confirm
      show
      title="테스트타이틀"
      msg="AA"
      icon="info"
      confirmButtonText="확인"
      cancelButtonText="취소"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />,
  )

  expect(fire).toHaveBeenCalled()
})
