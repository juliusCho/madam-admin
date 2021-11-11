import React from 'react'
import customHooks from '~/utils/hooks'
import { AlertOrConfirm, AlertOrConfirmIconType } from '../shared'

export interface ConfirmProps {
  show: boolean
  title: string
  msg: string
  icon: Omit<AlertOrConfirmIconType, 'success'>
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
      icon as AlertOrConfirmIconType,
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
