import { render } from '@testing-library/react'
import Modal from 'react-modal'
import { ModalContent } from '.'

describe('Components ModalContent', () => {
  const div = document.createElement('div')
  Modal.setAppElement(div)

  it('display', () => {
    const onCancel = jest.fn()

    const { getByText } = render(
      <ModalContent isOpen title="타이틀" onCancel={onCancel}>
        내용
      </ModalContent>,
    )

    const child = getByText('내용')

    expect(child).toBeInTheDocument()

    div.remove()
  })
})
