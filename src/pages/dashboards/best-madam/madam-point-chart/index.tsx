import {
  DocumentData,
  endBefore,
  QueryConstraint,
  startAfter,
} from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiDashboard } from '~/apis'
import { ChartLineByDataset } from '~/components/charts/line-by-dataset'
import adminGlobalStates from '~/states/admin'
import { ScreenOptionType } from '~/types'

interface Props {
  device: ScreenOptionType
  className: string
}

function MadamPointChart({ device, className }: Props) {
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [data, setData] = React.useState<{
    isEnd?: boolean
    data: Array<[string, number]>
  }>({ data: [] })
  const [documents, setDocuments] = React.useState<DocumentData[]>([])
  const [displayCount, setDisplayCount] = React.useState(4)
  const [lastStartDate, setLastStartDate] = React.useState<
    { date: Date; isFirst: boolean } | undefined
  >()

  const onChangeDisplayCount = (count: number) => {
    setLastStartDate(undefined)
    setDocuments([])
    setDisplayCount(count)
  }

  const onClickPrevNext = (type: 'prev' | 'next') => {
    if (documents.length > 0) {
      setLastStartDate(
        type === 'prev'
          ? { date: documents[0].startDate, isFirst: true }
          : { date: documents[documents.length - 1].endDate, isFirst: false },
      )
    }
  }

  React.useLayoutEffect(() => {
    if (!admin) return () => {}

    let queryOffset: QueryConstraint | undefined

    if (lastStartDate) {
      queryOffset = lastStartDate.isFirst
        ? startAfter(lastStartDate.date)
        : endBefore(lastStartDate.date)
    }

    const subscription = apiDashboard
      .apiPointsPerMadam$(displayCount, queryOffset)
      .subscribe((result) => {
        if (result.length > 0) {
          let snapshot = !result[result.length - 1].latest
          const offset = result[0].startDate

          if (lastStartDate) {
            const snapshotDt = moment(lastStartDate.date).format('YYYYMMDD')
            const lastSnapshot = moment(offset).format('YYYYMMDD')

            if (snapshotDt === lastSnapshot) {
              snapshot = false
            }
          }

          if (snapshot) {
            setLastStartDate(() => ({
              date: offset,
              isFirst: true,
            }))
          }

          setDocuments(() => result)
          setData(() => ({
            isEnd: result.some((res) => res.latest),
            data: result.map((res) => [
              moment(res.startDate).format('YYYY-MM-DD'),
              res.charm,
            ]) as Array<[string, number]>,
          }))
        }
      })

    return () => subscription.unsubscribe()
  }, [
    admin,
    displayCount,
    lastStartDate,
    apiDashboard.apiPointsPerMadam$,
    moment,
    startAfter,
    endBefore,
  ])

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
      displayCounts={
        device === 'mobile' || device === 'smallScreen'
          ? [4, 10]
          : [4, 10, 20, 30]
      }
      onChangeDisplayDataCount={onChangeDisplayCount}
      prev={{
        onClick: () => onClickPrevNext('prev'),
        disabled: data.data.length < displayCount,
      }}
      next={{
        onClick: () => onClickPrevNext('next'),
        disabled: data.isEnd,
      }}
      className={className}
      colors={['pink']}
    />
  )
}

export default React.memo(MadamPointChart)
