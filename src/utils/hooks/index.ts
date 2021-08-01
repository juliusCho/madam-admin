import React from 'react'

const useIsMounted = () => {
  const isMountedRef = React.useRef(true)
  const isMounted = React.useCallback(() => isMountedRef.current, [])

  React.useEffect(
    () => () => {
      isMountedRef.current = false
    },
    [],
  )

  return isMounted
}

export default {
  useIsMounted,
}
