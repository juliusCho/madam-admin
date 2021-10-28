import React from 'react'
import { apiDashboard } from '~/apis'
import { ChartDonut } from '~/components/charts/donut'
import customHooks from '~/utils/hooks'

interface Props {
  className: string
}

function CountryChart({ className }: Props) {
  const [data, setData] = React.useState<
    Array<{ code: string; label: string; count: number }>
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchData = React.useCallback(async () => {
    const result = await apiDashboard.apiCountryCount()
    if (!result) {
      setData(() => [])
      return
    }

    setData(() => result)
  }, [apiDashboard.apiCountryCount])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartDonut
      title="국가 비율"
      data={(
        [['국가', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
    />
  )
}

export default React.memo(CountryChart)
