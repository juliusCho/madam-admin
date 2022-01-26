import React from 'react'
import { Loading } from '~/components/etc/loading'
import { CRUD } from '~/enums'
import { GridColumn } from '../column'
import { GridHeader } from '../header'
import GridBodyStyle from './body.style'

type Properties = {
  key: string
  width: string | number
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
    | ((input: string) => void)
    | ((input: number) => void)
    | ((input: boolean) => void)
    | ((input: string[]) => void)
    | ((input: Date) => void)
  onSort?: (newState?: 'asc' | 'desc') => void
  nullable?: boolean
  sort?: 'asc' | 'desc'
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
  style,
  className,
}: GridBodyProps) {
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

  const gridHeader = React.useCallback(
    (prop: Properties, idx: number) => {
      const key = `${prop.key}-${idx}`

      switch (prop.type) {
        case 'check':
          return (
            <GridHeader
              key={key}
              checked={checkedAll}
              onClick={prop.key === 'check' ? onCheckAll : undefined}
              width={prop.width}>
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
                key={key}
                width={prop.width}
                sort={prop.sort}
                onClick={() => {
                  if (prop.onSort) {
                    prop.onSort(swapSort(prop.sort))
                  }
                }}>
                {prop.label}
              </GridHeader>
            )
          }

          return (
            <GridHeader key={key} width={prop.width}>
              {prop.label}
            </GridHeader>
          )
        default:
          return (
            <GridHeader key={key} width={prop.width}>
              {prop.label}
            </GridHeader>
          )
      }
    },
    [swapSort, checkedAll, onCheckAll],
  )

  const fixedLength = React.useMemo(() => {
    return `${props
      .filter((_, idx) => idx <= Number(fixedColumnIndex))
      .map((property) =>
        Number(String(property.width).replace('px', '').replace('rem', '')),
      )
      .reduce((a, b) => a + b)}rem`
  }, [props, fixedColumnIndex])

  const unfixedLength = React.useMemo(() => {
    return `${props
      .filter((_, idx) => idx > Number(fixedColumnIndex))
      .map((property) =>
        Number(String(property.width).replace('px', '').replace('rem', '')),
      )
      .reduce((a, b) => a + b)}rem`
  }, [props, fixedColumnIndex])

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
    (rowKey: string, cell: Cell, idx: number) => {
      const key = `${rowKey}-${cell.key}-${idx}`

      const cellProps = {
        key,
        type: cell.type,
        options: cell.options,
        onChange: cell.onChange,
        nullable: cell.nullable,
        format: cell.format,
        width: cell.width,
        justify: cell.justify,
        editable: !cell.uneditable,
      }

      switch (cell.type) {
        case 'check':
          return (
            <GridColumn
              key={key}
              type="check"
              onChange={
                cell.key === 'check'
                  ? (newState: boolean) => onCheck(idx, newState)
                  : cell.onChange
              }
              justify="center"
              editable
              width={cell.width}>
              {cell.value}
            </GridColumn>
          )
        case 'crud':
          return (
            <GridColumn key={key} type="crud" justify="center" width="3.5rem">
              {cell.value}
            </GridColumn>
          )
        case 'text':
        case 'number':
        case 'date':
          return <GridColumn {...cellProps}>{cell.value}</GridColumn>
        case 'single-select':
        case 'multi-select':
          return <GridColumn {...cellProps}>{getOptionValue(cell)}</GridColumn>
        default:
          return <GridColumn key={key}>{cell.value}</GridColumn>
      }
    },
    [getOptionValue, onCheck],
  )

  return (
    <div
      {...GridBodyStyle.container({ height, style, className })}
      data-testid="components.grids.body.container">
      <Loading loading={!!loading} style={{ height: '100%', bottom: 0 }} />
      <div {...GridBodyStyle.headerContainer}>
        <div {...GridBodyStyle.fixedArea(fixedLength, true)}>
          {fixedHeaders.map((prop, idx) => gridHeader(prop, idx))}
        </div>
        <div {...GridBodyStyle.unfixedArea(unfixedLength, true)}>
          {unfixedHeaders.map((prop, idx) => gridHeader(prop, idx))}
        </div>
      </div>
      <div {...GridBodyStyle.columnContainer}>
        <div {...GridBodyStyle.fixedArea(fixedLength)}>
          {fixedCells.map((fixedRow, rowIdx) => (
            <ul
              key={`${String(fixedRow.length)}-${String(rowIdx)}`}
              {...GridBodyStyle.row}>
              {fixedRow.map((cell, idx) =>
                gridCell(`${fixedRow.length}-${rowIdx}`, cell, idx),
              )}
            </ul>
          ))}
        </div>
        <div {...GridBodyStyle.unfixedArea(unfixedLength)}>
          {unfixedCells.map((unfixedRow, rowIdx) => (
            <ul
              key={`${String(unfixedRow.length)}-${String(rowIdx)}`}
              {...GridBodyStyle.row}>
              {unfixedRow.map((cell, idx) =>
                gridCell(`${unfixedRow.length}-${rowIdx}`, cell, idx),
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

GridBody.defaultProps = {
  checkedAll: false,
  fixedColumnIndex: 0,
  editable: true,
  height: '100%',
  loading: false,
  style: undefined,
  className: undefined,
}

export default React.memo(GridBody)
