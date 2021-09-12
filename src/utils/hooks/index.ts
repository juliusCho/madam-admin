import React from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import {
  MAX_MEDIUM_SCREEN,
  MAX_SMALL_SCREEN,
  ROUTER_PATH,
} from '../../constants'
import adminGlobalStates from '../../recoil/admin'
import deviceGlobalStates from '../../recoil/device'
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
  isMobile: boolean,
  setShowToTop: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setIsMediumScreen = Recoil.useSetRecoilState(
    deviceGlobalStates.isMediumScreen,
  )
  const setIsSmallScreen = Recoil.useSetRecoilState(
    deviceGlobalStates.isSmallScreen,
  )

  const isMounted = useIsMounted()

  const onScroll = React.useCallback(() => {
    const { body } = document
    const docEl = document.documentElement
    const doc = docEl.clientHeight ? docEl : body

    if (doc.scrollTop === 0) {
      setShowToTop(() => true)
    } else {
      setShowToTop(() => false)
    }
  }, [document])

  const resizeEvent = React.useCallback(() => {
    onScroll()

    if (isMobile) {
      setIsMediumScreen(() => false)
      setIsSmallScreen(() => false)
      return
    }

    if (window.innerWidth <= MAX_SMALL_SCREEN) {
      setIsMediumScreen(() => false)
      setIsSmallScreen(() => true)
      return
    }

    if (window.innerWidth <= MAX_MEDIUM_SCREEN) {
      setIsMediumScreen(() => true)
      setIsSmallScreen(() => false)
    }
  }, [isMobile, window.innerWidth])

  React.useEffect(() => {
    if (typeof window === 'undefined') return () => {}

    if (isMounted()) {
      resizeEvent()

      window.addEventListener('load', resizeEvent)
      window.addEventListener('resize', resizeEvent)
      window.addEventListener('scroll', onScroll)
    }
    return () => {
      window.removeEventListener('load', resizeEvent)
      window.removeEventListener('resize', resizeEvent)
      window.removeEventListener('scroll', onScroll)
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

function useForceUpdate() {
  const [, setValue] = React.useState(0)
  return () => setValue((value) => value + 1)
}

export default {
  useIsMounted,
  useCheckMobile,
  usePage,
  useForceUpdate,
}
