import React from 'react'
import { Loading } from '~/components/etc/loading'
import { Confirm } from '~/components/modals/confirm'
import { CRUD } from '~/enums'
import { GridHeader } from '../header'
import GridBodyStyle from './body.style'
import { GridRow } from './row'
import { Cell, Properties, Value } from './row/row.component'

export interface GridBodyProps {
  onCheck: (idx: number, newState: boolean) => void
  onCheckAll: () => void
  properties: Properties[]
  data: Record<string, Value>[]
  checkedAll?: boolean
  fixedColumnIndex?: number
  editable?: boolean
  height?: string | number
  loading?: boolean
  onDrag?: (oldNo: number, newNo: number) => void
  style?: React.CSSProperties
  className?: string
}

function GridBody({
  onCheck,
  onCheckAll,
  properties,
  data,
  checkedAll,
  fixedColumnIndex,
  editable,
  height,
  loading,
  onDrag,
  style,
  className,
}: GridBodyProps) {
  const [draggingIdx, setDragginIdx] = React.useState(-1)
  const [confirm, setConfirm] = React.useState<{
    show: boolean
    onSort?: (newState?: 'desc' | 'asc') => void
    newState?: 'desc' | 'asc'
  }>({ show: false })
  const [astaColumnWidth, setAstaColumnWidth] = React.useState('')

  const containerRef = React.createRef<HTMLDivElement>()

  const props = React.useMemo(() => {
    const numColumn = {
      key: 'no',
      type: 'number',
      label: 'No',
      width: '4rem',
      justify: 'center',
      uneditable: true,
    }

    const result = editable
      ? [
          {
            key: 'check',
            type: 'check',
            justify: 'center',
            width: '3rem',
          },
          {
            key: 'crud',
            type: 'crud',
            justify: 'center',
            width: '3.5rem',
            uneditable: true,
          },
          numColumn,
          ...properties,
        ]
      : [numColumn]

    return (
      onDrag
        ? [
            ...result,
            {
              key: 'drag',
              type: 'drag',
              label: '순서 변경',
              width: '6rem',
              justify: 'center',
              uneditable: true,
            },
          ]
        : result
    ) as Properties[]
  }, [properties, editable, onDrag])

  const layoutReload = React.useCallback(() => {
    if (!containerRef.current) return

    const { width } = containerRef.current.getBoundingClientRect()

    const rem = width / 16

    const allSummed = props
      .filter((property) => property.width !== '*')
      .map((property) =>
        Number(String(property.width).replace('px', '').replace('rem', '')),
      )
      .reduce((a, b) => a + b)

    setAstaColumnWidth(
      () => `${rem - allSummed < 0 ? '4' : rem - allSummed}rem`,
    )
  }, [containerRef, props])

  React.useEffect(() => {
    layoutReload()
  }, [])

  React.useLayoutEffect(() => {
    window.addEventListener('load', layoutReload)
    window.addEventListener('resize', layoutReload)

    return () => {
      window.removeEventListener('load', layoutReload)
      window.removeEventListener('resize', layoutReload)
    }
  }, [layoutReload])

  const swapSort = React.useCallback((sort?: 'asc' | 'desc') => {
    switch (sort) {
      case 'asc':
        return 'desc'
      case 'desc':
        return undefined
      default:
        return 'asc'
    }
  }, [])

  const modified = React.useMemo(
    () => data.some((item) => item.crud !== CRUD.READ),
    [data],
  )

  const astaCalculate = React.useCallback(
    (width: string | number) => (width === '*' ? astaColumnWidth : width),
    [astaColumnWidth],
  )

  const onSort = React.useCallback((prop: Properties) => {
    if (prop.onSort) {
      if (modified) {
        setConfirm(() => ({
          show: true,
          newState: swapSort(prop.sort),
          onSort: prop.onSort,
        }))
      } else {
        prop.onSort(swapSort(prop.sort))
      }
    }
  }, [])

  const gridHeader = React.useCallback(
    (prop: Properties, idx: number) => {
      const key = `${prop.key}-${idx}`

      const common = {
        key,
        width: astaCalculate(prop.width),
      }

      switch (prop.type) {
        case 'check':
          return (
            <GridHeader
              {...common}
              checked={checkedAll}
              sort={prop.sort}
              sortable={prop.sortable}
              onClick={prop.key === 'check' ? onCheckAll : () => onSort(prop)}>
              {prop.label}
            </GridHeader>
          )
        case 'crud':
          return (
            <GridHeader key={key} width="3.5rem">
              CRUD
            </GridHeader>
          )
        case 'number':
        case 'date':
          if (prop.onSort) {
            return (
              <GridHeader
                {...common}
                sort={prop.sort}
                sortable={prop.sortable}
                onClick={() => onSort(prop)}>
                {prop.label}
              </GridHeader>
            )
          }

          return <GridHeader {...common}>{prop.label}</GridHeader>
        default:
          return <GridHeader {...common}>{prop.label}</GridHeader>
      }
    },
    [swapSort, checkedAll, onCheckAll, modified, astaCalculate, onSort],
  )

  const fixedLength = React.useMemo(() => {
    return `${props
      .filter((_, idx) => idx <= Number(fixedColumnIndex))
      .map((property) =>
        Number(
          String(astaCalculate(property.width))
            .replace('px', '')
            .replace('rem', ''),
        ),
      )
      .reduce((a, b) => a + b)}rem`
  }, [props, fixedColumnIndex, astaCalculate])

  const unfixedLength = React.useMemo(() => {
    return `${props
      .filter((_, idx) => idx > Number(fixedColumnIndex))
      .map((property) =>
        Number(
          String(astaCalculate(property.width))
            .replace('px', '')
            .replace('rem', ''),
        ),
      )
      .reduce((a, b) => a + b)}rem`
  }, [props, fixedColumnIndex, astaCalculate])

  const constructedData = React.useMemo(
    () =>
      data.map((datum) => {
        const result: Record<string, Value> = {}

        props.forEach((property) => {
          result[property.key] = datum[property.key]
        })

        return result
      }),
    [data, props],
  )

  const fixedCells = React.useMemo(
    () =>
      constructedData.map((datum, rowIdx) =>
        Object.values(datum)
          .filter((_, idx) => idx <= Number(fixedColumnIndex))
          .map((value, idx) => {
            if (idx === 0) {
              return {
                ...props[idx],
                value,
                onChange: (newValue?: boolean) => onCheck(rowIdx, !!newValue),
              }
            }

            return {
              value,
              ...props[idx],
            }
          }),
      ) as Array<Cell[]>,
    [constructedData, props, fixedColumnIndex, onCheck],
  )

  const unfixedCells = React.useMemo(
    () =>
      constructedData.map((datum) =>
        Object.values(datum)
          .filter((_, idx) => idx > Number(fixedColumnIndex))
          .map((value, idx) => {
            return {
              value,
              ...props[idx + Number(fixedColumnIndex) + (editable ? 1 : 0)],
            }
          }),
      ) as Array<Cell[]>,
    [constructedData, props, fixedColumnIndex, editable],
  )

  const fixedHeaders = React.useMemo(
    () => props.filter((_, idx) => idx <= Number(fixedColumnIndex)),
    [props, fixedColumnIndex],
  )
  const unfixedHeaders = React.useMemo(
    () => props.filter((_, idx) => idx > Number(fixedColumnIndex)),
    [props, fixedColumnIndex],
  )

  return (
    <>
      <Confirm
        show={confirm.show}
        onCancel={() => setConfirm((old) => ({ ...old, show: false }))}
        onConfirm={() => {
          if (confirm.onSort) {
            confirm.onSort(confirm.newState)
          }
          setConfirm((old) => ({ ...old, show: false }))
        }}
        title="알림"
        msg="수정 중인 내용이 초기화 됩니다. 진행하시겠습니까?"
        icon="warning"
        confirmButtonText="진행"
        cancelButtonText="취소"
      />
      <div
        ref={containerRef}
        {...GridBodyStyle.container({ height, style, className })}
        data-testid="components.grids.body.container">
        <Loading
          loading={!!loading}
          style={{
            height: '100%',
            width: `calc(${fixedLength} + ${unfixedLength})`,
            bottom: 0,
          }}
        />
        <div {...GridBodyStyle.headerContainer}>
          <div {...GridBodyStyle.fixedArea(fixedLength, true)}>
            {fixedHeaders.map((prop, idx) => gridHeader(prop, idx))}
          </div>
          <div {...GridBodyStyle.unfixedArea(unfixedLength, true)}>
            {unfixedHeaders.map((prop, idx) => gridHeader(prop, idx))}
          </div>
        </div>
        <div {...GridBodyStyle.columnContainer}>
          {constructedData.length === 0 ? (
            <span {...GridBodyStyle.noData}>조회된 데이터가 없습니다.</span>
          ) : (
            <>
              <div {...GridBodyStyle.fixedArea(fixedLength)}>
                {fixedCells.map((fixedRow, rowIdx) => (
                  <GridRow
                    key={`${String(fixedRow.length)}-${String(rowIdx)}`}
                    rowIdx={rowIdx}
                    cells={fixedRow}
                    onCheck={onCheck}
                    astaCalculate={astaCalculate}
                  />
                ))}
              </div>
              <div {...GridBodyStyle.unfixedArea(unfixedLength)}>
                {unfixedCells.map((unfixedRow, rowIdx) => (
                  <GridRow
                    key={`${String(unfixedRow.length)}-${String(rowIdx)}`}
                    rowIdx={rowIdx}
                    cells={unfixedRow}
                    onCheck={onCheck}
                    astaCalculate={astaCalculate}
                    onDrag={(idx) => setDragginIdx(idx)}
                    onDrop={(idx) => {
                      if (onDrag) {
                        onDrag(draggingIdx, idx)
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

GridBody.defaultProps = {
  checkedAll: false,
  fixedColumnIndex: 0,
  editable: true,
  height: '100%',
  loading: false,
  onDrag: undefined,
  style: undefined,
  className: undefined,
}

export default React.memo(GridBody)
