import { render } from '@testing-library/react'
import Swal from 'sweetalert2'
import Alert from './alert.component'

it('알림 창 테스트', () => {
  const fire = jest.spyOn(Swal, 'fire')

  render(<Alert show msg="AA" type="info" showTime={10000} />)

  expect(fire).toHaveBeenCalled()
})
