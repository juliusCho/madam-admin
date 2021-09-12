import React from 'react'
import Swal, { SweetAlertResult } from 'sweetalert2'
import customHooks from '../../../utils/hooks'

type IconType = 'error' | 'success' | 'warning' | 'info'

function AlertOrConfirm(
  confirm: boolean,
  titleText: string,
  icon: IconType,
  text?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  timer?: number,
): Promise<SweetAlertResult> {
  let fireOptions = {}
  if (confirm) {
    fireOptions = {
      focusConfirm: false,
      focusCancel: true,
      text,
      confirmButtonText,
      showCancelButton: confirm,
      cancelButtonText,
      confirmButtonColor: '#3067A8',
      reverseButtons: true,
      showCloseButton: true,
    }
  }

  const ConfirmAlert = Swal.mixin({
    showConfirmButton: confirm,
    toast: !confirm,
    timer: confirm ? undefined : timer,
    timerProgressBar: !confirm,
    position: confirm ? 'center' : 'top-end',
    didOpen: confirm
      ? undefined
      : (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
  })

  return ConfirmAlert.fire({
    ...fireOptions,
    titleText,
    icon,
  })
}

export interface AlertProps {
  show: boolean
  msg: string
  type: IconType
  onHide?: () => void
  showTime?: number
}

function Alert({ show, msg, type, onHide, showTime }: AlertProps) {
  const [popup, setPopup] = React.useState(false)

  const isMounted = customHooks.useIsMounted()

  const showAlert = React.useCallback(async () => {
    if (!isMounted()) return
    if (!show) return
    if (popup) return

    setPopup(() => true)

    await AlertOrConfirm(
      false,
      msg,
      type,
      undefined,
      undefined,
      undefined,
      showTime,
    ).then(
      () => {},
      () => {},
    )

    if (!onHide) return

    setTimeout(() => {
      onHide()
      setPopup(() => false)
    }, showTime || 1000)
  }, [isMounted, show, msg, type, showTime, onHide, popup])

  React.useEffect(() => {
    if (!isMounted()) return

    showAlert().then(
      () => {},
      () => {},
    )
  }, [isMounted, showAlert])

  return <></>
}

Alert.defaultProps = {
  onHide: undefined,
  showTime: 1000,
}

export default React.memo(Alert)
