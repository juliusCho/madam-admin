import React from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import Recoil from 'recoil'
import { Observable } from 'rxjs'
import {
  MAX_MEDIUM_SCREEN,
  MAX_SMALL_SCREEN,
  ROUTER_PATH,
} from '~/constants/etc'
import { CRUD } from '~/enums'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import etcGlobalStates from '~/states/etc'

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
      setShowToTop(() => false)
    } else {
      setShowToTop(() => true)
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

function useObservable<T>(observable: Observable<T>) {
  const [state, setState] = React.useState<T>()

  React.useLayoutEffect(() => {
    const sub$ = observable.subscribe(setState)
    return () => sub$.unsubscribe()
  }, [observable])

  return state
}

function useGridPageData<T>(
  list: T[],
  page: number,
  pageCount?: number | null,
) {
  return React.useMemo(
    () => ({
      pageCount: (() => {
        const pages = Math.floor(list.length / (pageCount ?? 999999))
        const leftOversExist = list.length - pages > 0

        return pages + (leftOversExist ? 1 : 0)
      })(),
      pageList: (() => {
        let offset = (page - 1) * (pageCount ?? list.length)

        const items: T[] = []

        for (offset; offset < page * (pageCount ?? list.length); offset += 1) {
          if (offset === list.length) {
            break
          }
          items.push(list[offset])
        }

        return items
      })(),
    }),
    [list, page, pageCount],
  )
}

function useGridCancelDelete<
  T extends { crud: CRUD; check: boolean; key?: string },
>(setList: React.Dispatch<React.SetStateAction<T[]>>, orgList: T[]) {
  return {
    onCancel: React.useCallback(() => {
      setList((oldList) =>
        oldList
          .filter((item) => item.crud !== CRUD.CREATE || !item.check)
          .map((item, idx) => {
            if (item.check) {
              const found = orgList.find((org) => org.key === item.key)
              if (found) {
                return { ...found, check: false, crud: CRUD.READ, no: idx + 1 }
              }

              return { ...item, check: false, crud: CRUD.READ, no: idx + 1 }
            }

            return { ...item, no: idx + 1 }
          }),
      )
    }, [orgList]),
    onDelete: React.useCallback(() => {
      setList((oldList) =>
        oldList
          .filter((item) => item.crud !== CRUD.CREATE || !item.check)
          .map((item) => (item.check ? { ...item, crud: CRUD.DELETE } : item)),
      )
    }, []),
  }
}

export default {
  useIsMounted,
  useCheckMobile,
  usePage,
  useForceUpdate,
  useObservable,
  useGridPageData,
  useGridCancelDelete,
}
