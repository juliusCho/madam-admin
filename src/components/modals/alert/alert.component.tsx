import React from 'react'
import customHooks from '~/utils/hooks'
import { AlertOrConfirm, AlertOrConfirmIconType } from '../shared'

export interface AlertProps {
  show: boolean
  msg: string
  type: AlertOrConfirmIconType
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
