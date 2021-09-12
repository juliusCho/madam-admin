import React from 'react'
import Swal, { SweetAlertResult } from 'sweetalert2'
import customHooks from '../../../utils/hooks'

type IconType = 'error' | 'warning' | 'info'

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

export interface ConfirmProps {
  show: boolean
  title: string
  msg: string
  icon: IconType
  confirmButtonText: string
  cancelButtonText: string
  onCancel: () => void
  onConfirm: () => void
}

function Confirm({
  show,
  title,
  msg,
  icon,
  confirmButtonText,
  cancelButtonText,
  onCancel,
  onConfirm,
}: ConfirmProps) {
  const [popup, setPopup] = React.useState(false)

  const isMounted = customHooks.useIsMounted()

  const showConfirm = React.useCallback(async () => {
    if (!isMounted()) return
    if (!show) return
    if (popup) return

    setPopup(() => true)

    const res = await AlertOrConfirm(
      true,
      title,
      icon,
      msg,
      confirmButtonText,
      cancelButtonText,
    )

    if (res.isConfirmed) {
      onConfirm()
    } else {
      onCancel()
    }
    setPopup(() => false)
  }, [
    isMounted,
    show,
    title,
    msg,
    icon,
    confirmButtonText,
    cancelButtonText,
    onCancel,
    onConfirm,
    popup,
  ])

  React.useEffect(() => {
    if (isMounted()) {
      showConfirm().then(
        () => {},
        () => {},
      )
    }
  }, [isMounted, showConfirm])

  return <></>
}

export default React.memo(Confirm)
