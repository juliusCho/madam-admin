import React from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { ROUTER_PATH } from '../../constants'
import adminGlobalStates from '../../recoil/admin'
import etcGlobalStates from '../../recoil/etc'

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

const useCheckMobile = (
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const isMounted = useIsMounted()

  const resizeEvent = React.useCallback(() => {
    if (window.innerWidth >= 767) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return () => {}

    if (isMounted()) {
      resizeEvent()

      window.addEventListener('load', resizeEvent)
      window.addEventListener('resize', resizeEvent)
    }
    return () => {
      window.removeEventListener('load', resizeEvent)
      window.removeEventListener('resize', resizeEvent)
    }
  }, [isMounted, window, resizeEvent])
}

const usePage = (title: string, path: string) => {
  useTitle(title)

  const history = useHistory()

  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)
  const setLoading = Recoil.useSetRecoilState(etcGlobalStates.loadingState)
  const setFirstLoading = Recoil.useSetRecoilState(
    etcGlobalStates.firstTabLoadingState,
  )
  const setSecondLoading = Recoil.useSetRecoilState(
    etcGlobalStates.secondTabLoadingState,
  )

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setLoading(() => false)

    if (history.location.pathname === path) {
      setFirstLoading(() => false)
      setSecondLoading(() => false)
    }
  }, [isMounted, history.location.pathname, path])

  React.useEffect(() => {
    if (!isMounted()) return

    if (admin === null) {
      setLoading(() => true)
      history.push(ROUTER_PATH.LOGIN)
    }
  }, [isMounted, admin, history.push, ROUTER_PATH.LOGIN])
}

export default {
  useIsMounted,
  useCheckMobile,
  usePage,
}
