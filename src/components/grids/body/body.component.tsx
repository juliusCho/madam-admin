import React from 'react'
import { Loading } from '~/components/etc/loading'
import { Confirm } from '~/components/modals/confirm'
import { CRUD } from '~/enums'
import { GridColumn } from '../column'
import { GridHeader } from '../header'
import GridBodyStyle from './body.style'

export type Properties = {
  key: string
  width: string | number | '*'
  label?: string
  type?:
    | 'check'
    | 'crud'
    | 'text'
    | 'number'
    | 'single-select'
    | 'multi-select'
    | 'date'
  options?: Array<{ value: string; label: string }>
  onChange?:
    | ((idx: number, input: string) => void)
    | ((idx: number, input: number) => void)
    | ((idx: number, input: boolean) => void)
    | ((idx: number, input: string[]) => void)
    | ((idx: number, input: Date) => void)
  onSort?: (newState?: 'asc' | 'desc') => void
  nullable?: boolean
  sort?: 'asc' | 'desc'
  sortable?: boolean
  format?: string
  justify?: 'center' | 'start' | 'end'
  uneditable?: boolean
}

type Value = boolean | CRUD | number | string | Date | undefined

interface Cell extends Properties {
  value: Value
}

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

    return editable
      ? ([
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
        ] as Properties[])
      : ([numColumn] as Properties[])
  }, [properties, editable])

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

  const getOptionValue = React.useCallback((cell: Cell) => {
    if (cell.type === 'single-select') {
      return cell.options?.find((option) => option.value === cell.value)?.label
    }

    if (cell.type === 'multi-select') {
      const list = String(cell.value).split(',')
      return list
        .map((item) => {
          const found = cell.options?.find(
            (option) => option.value === item,
          )?.label
          return found ?? ' '
        })
        .join(',')
        .replaceAll(' ,', '')
    }

    return undefined
  }, [])

  const gridCell = React.useCallback(
    (rowKey: string, rowIdx: number, cell: Cell, idx: number) => {
      const key = `${rowKey}-${cell.key}-${idx}`

      const cellProps = {
        key,
        type: cell.type,
        options: cell.options,
        nullable: cell.nullable,
        format: cell.format,
        width: astaCalculate(cell.width),
        justify: cell.justify,
        editable: !cell.uneditable,
      }

      switch (cell.type) {
        case 'check':
          return (
            <GridColumn
              key={key}
              type="check"
              onChange={(newState: boolean) => {
                if (!!cell.value === newState) return

                if (cell.key === 'check') {
                  onCheck(rowIdx, newState)
                } else if (cell.onChange) {
                  cell.onChange(rowIdx, newState as never)
                }
              }}
              justify="center"
              editable
              width={astaCalculate(cell.width)}>
              {cell.value}
            </GridColumn>
          )
        case 'crud':
          return (
            <GridColumn key={key} type="crud" justify="center" width="3.5rem">
              {cell.value}
            </GridColumn>
          )
        case 'number':
        case 'date':
        case 'text':
          return (
            <GridColumn
              {...cellProps}
              onChange={(newState: number | Date | string) => {
                if (Number(cell.value) === newState) return
                if (cell.onChange) {
                  cell.onChange(rowIdx, newState as never)
                }
              }}>
              {cell.value}
            </GridColumn>
          )
        case 'single-select':
          return (
            <GridColumn
              {...cellProps}
              onChange={(newState: string) => {
                if (String(cell.value) === newState) return
                if (cell.onChange) {
                  cell.onChange(rowIdx, newState as never)
                }
              }}>
              {getOptionValue(cell)}
            </GridColumn>
          )
        case 'multi-select':
          return (
            <GridColumn
              {...cellProps}
              onChange={(newState: string[]) => {
                if (
                  cell.onChange &&
                  ((cell.value as undefined | string[])?.length !==
                    newState.length ||
                    (cell.value as undefined | string[])?.some(
                      (val) => !newState.some((i) => i === val),
                    ) ||
                    newState.some(
                      (val) =>
                        !(cell.value as undefined | string[])?.some(
                          (i) => i === val,
                        ),
                    ))
                ) {
                  cell.onChange(rowIdx, newState as never)
                }
              }}>
              {getOptionValue(cell)}
            </GridColumn>
          )
        default:
          return <GridColumn key={key}>{cell.value}</GridColumn>
      }
    },
    [getOptionValue, onCheck, astaCalculate],
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
                  <ul
                    key={`${String(fixedRow.length)}-${String(rowIdx)}`}
                    {...GridBodyStyle.row}>
                    {fixedRow.map((cell, idx) =>
                      gridCell(
                        `${fixedRow.length}-${rowIdx}`,
                        rowIdx,
                        cell,
                        idx,
                      ),
                    )}
                  </ul>
                ))}
              </div>
              <div {...GridBodyStyle.unfixedArea(unfixedLength)}>
                {unfixedCells.map((unfixedRow, rowIdx) => (
                  <ul
                    key={`${String(unfixedRow.length)}-${String(rowIdx)}`}
                    {...GridBodyStyle.row}
                    draggable={!!onDrag}>
                    {unfixedRow.map((cell, idx) =>
                      gridCell(
                        `${unfixedRow.length}-${rowIdx}`,
                        rowIdx,
                        cell,
                        idx,
                      ),
                    )}
                  </ul>
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
