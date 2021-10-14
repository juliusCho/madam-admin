import React from 'react'
import { apiDashboard } from '~/api'
import { ChartDonut } from '~/components/charts/donut'
import customHooks from '~/utils/hooks'

interface Props {
  token: string
  isLike: boolean
  className: string
}

function InterestChart({ token, isLike, className }: Props) {
  const [data, setData] = React.useState<
    Array<{ id: string; count: number; label: string }>
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchData = React.useCallback(async () => {
    const result = await apiDashboard.apiInterestsCount(token, isLike)

    if (!result) {
      setData((oldList) => oldList.map((old) => ({ ...old, count: 0 })))
      return
    }

    setData(() => result)
  }, [token, apiDashboard.apiInterestsCount, isLike])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartDonut
      title={`${isLike ? '관심사 별' : '싫어요 별'} 비율`}
      data={(
        [[isLike ? '관심사' : '싫어요', '사용자 수']] as Array<
          [string, string] | [string, number]
        >
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(InterestChart)
