import React from 'react'
import { apiDashboard } from '~/api'
import { ChartDonut } from '~/components/charts/donut'
import { GENDER_LABEL } from '~/constants/app'
import { GENDER } from '~/enums'
import customHooks from '~/utils/hooks'

interface Props {
  className: string
}

function GenderChart({ className }: Props) {
  const [data, setData] = React.useState<
    Array<{ status: string; count: number; label: string }>
  >(
    Object.values(GENDER).map((status) => ({
      status,
      label: GENDER_LABEL[status],
      count: 0,
    })),
  )

  const isMounted = customHooks.useIsMounted()

  const fetchData = React.useCallback(async () => {
    const result = await apiDashboard.apiUserCountPerGender()

    if (!result) {
      setData((oldList) => oldList.map((old) => ({ ...old, count: 0 })))
      return
    }
    setData((oldList) =>
      oldList.map((old) => {
        const found = Object.keys(result).find((key) => key === old.status)
        if (found) {
          // @ts-ignore
          return { ...old, count: result[found] }
        }
        return { ...old, count: 0 }
      }),
    )
  }, [apiDashboard.apiUserCountPerGender])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartDonut
      title="사용자 남/여 비율"
      data={(
        [['성별', '사용자 수']] as Array<[string, string] | [string, number]>
      ).concat(data.map((datum) => [datum.label, datum.count]))}
      className={className}
      colors={['blue', 'red']}
    />
  )
}

export default React.memo(GenderChart)
