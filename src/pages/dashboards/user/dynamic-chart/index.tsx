import React from 'react'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import customHooks from '~/utils/hooks'

interface Props {
  id: string
  title: string
  className: string
}

function DynamicChart({ id, title, className }: Props) {
  const [data, setData] = React.useState<
    Array<{ count: number; label: string }>
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchValueList = React.useCallback(async () => {
    const result = await apiDashboard.apiDynamicProfileItemCount$(id)
    if (!result) {
      setData(() => [])
      return
    }

    setData(() => result)
  }, [id])

  React.useEffect(() => {
    if (isMounted()) {
      fetchValueList()
    }
  }, [isMounted, fetchValueList])

  return (
    <ChartDonut
      title={`${title} 별 비율`}
      data={(
        [['항목', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(DynamicChart)