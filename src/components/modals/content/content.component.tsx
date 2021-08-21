import React from 'react'
import Modal from 'react-modal'
import customHooks from '../../../utils/hooks'
import { ButtonRoundWithIcon } from '../../buttons/round-with-icon'
import ModalContentStyle from './content.style'
import './content.style.scss'

export interface ModalContentProps {
  isOpen: boolean
  title: string
  children: string | React.ReactNode | React.ReactNode[]
  submitText?: string
  cancelText?: string
  onSubmit?: () => void
  onCancel?: () => void
  backgroundColor?: string
  contentClassName?: string
}

function ModalContent({
  isOpen,
  title,
  children,
  submitText,
  cancelText,
  onSubmit,
  onCancel,
  backgroundColor,
  contentClassName,
}: ModalContentProps) {
  const [show, setShow] = React.useState(false)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      setShow(() => isOpen)
    }
  }, [isMounted, isOpen])

  const onClose = (type: 'submit' | 'cancel') => {
    setShow(false)

    setTimeout(() => {
      if (type === 'submit' && onSubmit) {
        onSubmit()
      } else if (type === 'cancel' && onCancel) {
        onCancel()
      }
    }, 200)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose('cancel')}
      portalClassName="h-screen w-screen"
      overlayClassName={ModalContentStyle.container({ backgroundColor })}
      contentLabel={title}
      className={`modal-content-container bottom-${
        show ? 'up' : 'down'
      } ${contentClassName}`}>
      {children}
      {(submitText || cancelText) && (
        <div className={ModalContentStyle.buttonArea}>
          {cancelText && (
            <ButtonRoundWithIcon
              icon="minus-circle-o"
              iconSize="0.85rem"
              onClick={() => onClose('cancel')}
              className={ModalContentStyle.button}
              colorInactive="bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive">
              {cancelText}
            </ButtonRoundWithIcon>
          )}
          {submitText && (
            <ButtonRoundWithIcon
              active
              icon="check"
              iconSize="0.85rem"
              onClick={() => onClose('submit')}
              className={ModalContentStyle.button}
              colorActive="bg-main-blue hover:bg-main-blueHover active:bg-main-blueActive">
              {submitText}
            </ButtonRoundWithIcon>
          )}
        </div>
      )}
    </Modal>
  )
}

ModalContent.defaultProps = {
  submitText: undefined,
  cancelText: undefined,
  onSubmit: undefined,
  onCancel: undefined,
  backgroundColor:
    'bg-mono-darkGray hover:bg-mono-darkGrayHover active:bg-mono-darkGrayActive',
  contentClassName: undefined,
}

export default React.memo(ModalContent)
