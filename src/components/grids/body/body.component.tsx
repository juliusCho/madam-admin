import React from 'react'
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
  sortable?: boolean
  format?: string
  justify?: 'center' | 'start' | 'end'
  uneditable?: boolean
  checked?: boolean
}

interface Cell extends Properties {
  value: boolean | 'c' | 'r' | 'u' | 'd' | number | string | Date
}

export interface GridBodyProps {
  onCheck: (idx: number, newState: boolean) => void
  onCheckAll: () => void
  properties: Properties[]
  data: Record<
    string,
    boolean | 'c' | 'r' | 'u' | 'd' | number | string | Date
  >[]
  checkedAll?: boolean
  fixedColumnIndex?: number
  editable?: boolean
  height?: string | number
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
  style,
  className,
}: GridBodyProps) {
  const props = React.useMemo(() => {
    return editable
      ? ([
          {
            key: 'check',
            type: 'check',
            justify: 'center',
            width: '4rem',
          },
          {
            key: 'crud',
            type: 'crud',
            justify: 'center',
            width: '4rem',
            uneditable: true,
          },
          {
            key: 'number',
            type: 'number',
            label: 'No',
            width: '4rem',
            justify: 'center',
            uneditable: true,
          },
          ...properties,
        ] as Properties[])
      : ([
          {
            key: 'number',
            type: 'number',
            label: 'No',
            width: '4rem',
            justify: 'center',
            uneditable: true,
          },
          ...properties,
        ] as Properties[])
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
            <GridHeader key={key} checked={checkedAll} onClick={onCheckAll} />
          )
        case 'crud':
          return <GridHeader key={key}>CRUD</GridHeader>
        case 'number':
        case 'date':
          if (prop.onSort) {
            return (
              <GridHeader
                key={key}
                width={prop.width}
                sort={prop.sort}
                sortable={prop.sortable}
                onClick={() => {
                  if (prop.onSort) {
                    prop.onSort(swapSort(prop.sort))
                  }
                }}>
                {prop.label}
              </GridHeader>
            )
          }

          return <GridHeader key={key}>{prop.label}</GridHeader>
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
    return `calc(${props
      .filter((_, idx) => idx <= Number(fixedColumnIndex))
      .map((property) => property.width)
      .join('+')})`
  }, [props, fixedColumnIndex])

  const unfixedLength = React.useMemo(() => {
    return `calc(${props
      .filter((_, idx) => idx > Number(fixedColumnIndex))
      .map((property) => property.width)
      .join('+')})`
  }, [props, fixedColumnIndex])

  const fixedCells = React.useMemo(() => {
    return data.map((datum, rowIdx) =>
      Object.values(datum)
        .filter((_, idx) => idx <= Number(fixedColumnIndex))
        .map((value, idx) => {
          if (idx === 0) {
            return {
              ...props[idx],
              checked: value,
              onChange: (newValue?: boolean) => onCheck(rowIdx, !!newValue),
            }
          }

          return {
            value,
            ...props[idx],
          }
        }),
    ) as Array<Cell[]>
  }, [data, props, fixedColumnIndex, onCheck])

  const unfixedCells = React.useMemo(() => {
    return data.map((datum) =>
      Object.values(datum)
        .filter((_, idx) => idx > Number(fixedColumnIndex))
        .map((value, idx) => {
          return {
            value,
            ...props[idx + Number(fixedColumnIndex) + (editable ? 1 : 0)],
          }
        }),
    ) as Array<Cell[]>
  }, [data, props, fixedColumnIndex, editable])

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
              checked={cell.checked}
              onChange={cell.onChange}
              justify="center"
              editable
            />
          )
        case 'crud':
          return (
            <GridColumn key={key} type="crud" justify="center">
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
    [getOptionValue],
  )

  console.log('unfixedCells', unfixedCells)

  return (
    <div
      {...GridBodyStyle.container({ height, style, className })}
      data-testid="components.grids.body.container">
      <div {...GridBodyStyle.headerContainer}>
        {props.map((prop, idx) => gridHeader(prop, idx))}
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
  style: undefined,
  className: undefined,
}

export default React.memo(GridBody)
