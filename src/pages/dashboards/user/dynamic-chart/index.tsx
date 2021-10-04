import React from 'react'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import customHooks from '~/utils/hooks'

interface Props {
  id: string
  type: PROFILE_EXTRA_ITEM_TYPE
  title: string
  token: string
  className: string
}

function DynamicChart({ id, type, title, token, className }: Props) {
  const [data, setDate] = React.useState<
    Array<{ value: string; count: number; label: string }>
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchValueList = React.useCallback(async () => {}, [id, type, token])

  return <></>
}

export default React.memo(DynamicChart)
