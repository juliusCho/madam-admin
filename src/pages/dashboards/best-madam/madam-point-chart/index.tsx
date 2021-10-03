import React from 'react'
import { apiDashboard } from '~/api'
import { ChartLineByDataset } from '~/components/charts/line-by-dataset'
import customHooks from '~/utils/hooks'

interface Props {
  token: string
  className: string
}

function MadamPointChart({ token, className }: Props) {
  const [data, setData] = React.useState<{
    isEnd?: boolean
    data: Array<[string, number]>
  }>({ data: [] })
  const [offset, setOffset] = React.useState(0)
  const [displayCount, setDisplayCount] = React.useState(4)

  const isMounted = customHooks.useIsMounted()

  const onChangeDisplayCount = (count: number) => {
    setOffset(0)
    setDisplayCount(count)
  }

  const onClickPrevNext = (type: 'prev' | 'next') => {
    setOffset((old) => {
      return type === 'prev' ? old - displayCount : old + displayCount
    })
  }

  const fetchData = React.useCallback(async () => {
    const result = await apiDashboard.apiPointsPerMadam(
      token,
      offset,
      displayCount,
    )
    if (!result) {
      setData(() => ({ data: [] }))
      return
    }

    setData(() => ({
      isEnd: result.isEnd,
      data: result.data.map((datum) => [datum.madam, datum.point]),
    }))
  }, [displayCount, offset])

  React.useEffect(() => {
    if (isMounted()) {
      fetchData()
    }
  }, [isMounted, fetchData])

  return (
    <ChartLineByDataset
      title="최고의 마담별 포인트 수"
      data={(
        [
          [
            { type: 'string', label: '당선일자' },
            { type: 'number', label: '포인트' },
          ],
        ] as Array<Array<Record<string, string>> | Array<string | number>>
      ).concat(data.data)}
      displayCounts={[4, 10, 20, 30]}
      onChangeDisplayDataCount={onChangeDisplayCount}
      prev={{
        onClick: () => onClickPrevNext('prev'),
        disabled: data.isEnd,
      }}
      next={{
        onClick: () => onClickPrevNext('next'),
        disabled: offset === 0,
      }}
      className={className}
      colors={['pink']}
    />
  )
}

export default React.memo(MadamPointChart)
