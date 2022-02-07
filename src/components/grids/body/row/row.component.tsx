import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { CRUD } from '~/enums'
import { GridColumnType } from '~/types'
import { GridColumn } from '../../column'
import GridRowStyle from './row.style'

export type Properties = {
  key: string
  width: string | number | '*'
  label?: string
  type?: GridColumnType
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

export type Value = boolean | CRUD | number | string | Date | undefined

export interface Cell extends Properties {
  value: Value
}

export interface GridRowProps {
  rowIdx: number
  cells: Cell[]
  onCheck: (idx: number, newState: boolean) => void
  astaCalculate: (width: string | number) => string | number
  onDrag?: (oldNo: number) => void
  onDrop?: (newNo: number) => void
}

function GridRow({
  rowIdx,
  cells,
  onCheck,
  astaCalculate,
  onDrag,
  onDrop,
}: GridRowProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'dnd-row',
      canDrag: () => !!onDrag,
      collect: (monitor) => {
        return {
          isDragging: !!monitor.isDragging(),
        }
      },
    }),
    [onDrag],
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'dnd-row',
      canDrop: () => !!onDrop,
      drop: () => {
        if (!onDrop) {
          return
        }

        onDrop(rowIdx)
      },
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }
      },
    }),
    [onDrop, rowIdx],
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
        case 'dollar':
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
        case 'drag':
          return <GridColumn {...cellProps} />
        default:
          return <GridColumn key={key}>{cell.value}</GridColumn>
      }
    },
    [getOptionValue, onCheck, astaCalculate, rowIdx],
  )

  return (
    <div ref={drop}>
      <ul
        {...GridRowStyle.row({ isDragging, isOver, canDrop })}
        draggable={!!onDrag}
        ref={drag}
        onDragStart={() => {
          if (onDrag) {
            onDrag(rowIdx)
          }
        }}>
        {cells.map((cell, idx) =>
          gridCell(`${cells.length}-${rowIdx}`, cell, idx),
        )}
      </ul>
    </div>
  )
}

GridRow.defaultProps = {
  onDrag: undefined,
  onDrop: undefined,
}

export default React.memo(GridRow)
