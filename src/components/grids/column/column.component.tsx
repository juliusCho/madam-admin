import moment from 'moment'
import React from 'react'
import { InputMultiSelect } from '~/components/inputs/multi-select'
import { InputSingleSelect } from '~/components/inputs/single-select'
import { ModalDateTimePicker } from '~/components/modals/date-picker'
import { CRUD } from '~/enums'
import { BorderCSS, TailwindColorPalette, TailwindFontSize } from '~/types'
import GridColumnStyle from './column.style'

export interface GridColumnProps<
  ChildrenType extends string | string[] | boolean | number | Date,
  OnChangeArgType extends
    | ((input: string) => void)
    | ((input: number) => void)
    | ((input: boolean) => void)
    | ((input: string[]) => void)
    | ((input: Date) => void),
> {
  type?:
    | 'check'
    | 'text'
    | 'number'
    | 'single-select'
    | 'multi-select'
    | 'date'
    | 'crud'
  children?: ChildrenType
  options?: Array<{ value: string | number; label: string }>
  onChange?: OnChangeArgType
  nullable?: boolean
  format?: string
  width?: string | number
  justify?: 'center' | 'start' | 'end'
  editable?: boolean
  backgroundColor?: TailwindColorPalette
  borderCSS?: BorderCSS
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  style?: React.CSSProperties
  className?: string
}

function GridColumn<
  ChildrenType extends string | string[] | boolean | number | Date,
  OnChangeArgType extends
    | ((input: string) => void)
    | ((input: number) => void)
    | ((input: boolean) => void)
    | ((input: string[]) => void)
    | ((input: Date) => void),
>({
  type,
  children,
  options,
  onChange,
  nullable,
  format,
  width,
  justify,
  editable,
  backgroundColor,
  borderCSS,
  fontSize,
  fontColor,
  style,
  className,
}: GridColumnProps<ChildrenType, OnChangeArgType>) {
  const [editMode, setEditMode] = React.useState(false)
  const [value, setValue] = React.useState<string | boolean | number | CRUD>('')

  const containerRef = React.createRef<HTMLButtonElement>()

  const convertChildrenToValue = React.useCallback(() => {
    switch (type) {
      case 'multi-select':
        if (
          !Array.isArray(children) ||
          children.length === 0 ||
          typeof children[0] !== 'string'
        ) {
          setValue(() => '')
        } else {
          setValue(() => children.join(','))
        }
        break
      case 'date':
        if (
          Array.isArray(children) ||
          typeof children === 'boolean' ||
          !moment(children).isValid()
        ) {
          setValue(() => '')
        } else {
          setValue(() => moment(children).format(format))
        }
        break
      default:
        if (
          typeof children === 'boolean' ||
          typeof children === 'number' ||
          typeof children === 'string'
        ) {
          setValue(() => children)
        } else {
          setValue(() => '')
        }
        break
    }
  }, [type, children, format])

  React.useLayoutEffect(() => {
    convertChildrenToValue()
  }, [convertChildrenToValue])

  const checkClickAndCallOnChange = React.useCallback(
    (e: MouseEvent) => {
      if (!containerRef?.current) return

      const { clientX, clientY } = e
      const {
        x,
        y,
        width: containerWidth,
        height,
      } = containerRef.current.getBoundingClientRect()

      if (
        clientX >= x &&
        containerWidth + x >= clientX &&
        clientY >= y &&
        height + y >= clientY
      ) {
        setEditMode(() => false)
      }
    },
    [containerRef],
  )

  React.useLayoutEffect(() => {
    if (!editMode || type === 'date') {
      return () => {
        window.removeEventListener('click', checkClickAndCallOnChange)
      }
    }

    window.addEventListener('click', checkClickAndCallOnChange)

    return () => {
      window.removeEventListener('click', checkClickAndCallOnChange)
    }
  }, [checkClickAndCallOnChange, editMode, type])

  const onClickContainer = React.useCallback(() => {
    if (editMode) return
    if (type === 'single-select' || type === 'multi-select') return

    switch (type) {
      case 'check':
        console.log(
          '🚀 ~ file: column.component.tsx ~ line 160 ~ onClickContainer ~ value',
          typeof value,
        )
        console.log(
          '🚀 ~ file: column.component.tsx ~ line 160 ~ onClickContainer ~ onChange',
          onChange,
        )
        if (onChange && typeof value === 'boolean') {
          ;(onChange as (input: boolean) => void)(!value)
        }
        break
      case 'crud':
        break
      default:
        setEditMode(() => true)
        break
    }
  }, [type, onChange, value, editMode])

  const label = React.useMemo(() => {
    switch (type) {
      case 'check':
        return (
          <i
            {...GridColumnStyle.checkbox({
              fontColor,
              checked: typeof value === 'boolean' ? value : false,
            })}
          />
        )
      case 'single-select':
        return (
          <InputSingleSelect
            options={
              options?.map((option) =>
                option.value === value
                  ? { ...option, isSelected: true }
                  : option,
              ) ?? []
            }
            value={
              typeof value === 'string' || typeof value === 'number'
                ? value
                : undefined
            }
            onChange={(val) => {
              if (onChange) {
                if (!val) {
                  if (nullable) {
                    ;(onChange as (input: string) => void)('')
                  } else {
                    convertChildrenToValue()
                  }
                } else {
                  onChange(val as never)
                }
              }
            }}
            placeholder=""
            width="100%"
            fontSize={fontSize}
            fontColor={fontColor}
          />
        )
      case 'multi-select':
        return (
          <InputMultiSelect
            options={
              options?.map((option) =>
                option.value === value
                  ? { ...option, isSelected: true }
                  : option,
              ) ?? []
            }
            value={Array.isArray(children) ? children : undefined}
            onChange={(val) => {
              if (onChange) {
                if (!val) {
                  if (nullable) {
                    ;(onChange as (input: string[]) => void)([])
                  } else {
                    convertChildrenToValue()
                  }
                } else {
                  onChange(val as never)
                }
              }
            }}
            placeholder=""
            width="100%"
            fontSize={fontSize}
            fontColor={fontColor}
          />
        )
      case 'crud':
        if (
          typeof value !== 'string' ||
          !Object.values(CRUD).includes(value as CRUD)
        ) {
          return ''
        }

        return (
          <span
            {...GridColumnStyle.crud(value as CRUD, { fontSize, fontColor })}>
            {value.toUpperCase()}
          </span>
        )
      default:
        return value as string | number

      // if (!editMode) {
      //   return value as string | number
      // }

      // return (

      // )
    }
  }, [
    value,
    children,
    type,
    onChange,
    fontSize,
    fontColor,
    options,
    nullable,
    convertChildrenToValue,
    editMode,
  ])

  const changeDate = (date?: Date | Array<Date | undefined>) => {
    if (!onChange) return
    if (
      Array.isArray(children) ||
      typeof children === 'string' ||
      typeof children === 'number' ||
      typeof children === 'boolean'
    )
      return

    if (!date || Array.isArray(date)) {
      if (nullable) {
        onChange(children as never)
      }
      return
    }

    onChange(date as never)
  }

  const dateValueForModal = React.useMemo(() => {
    if (Array.isArray(children) || typeof children === 'boolean') {
      return undefined
    }

    return moment(children).isValid() ? (children as Date) : undefined
  }, [children])

  return (type !== 'check' && nullable && !children) || !type ? null : (
    <>
      <ModalDateTimePicker
        date={dateValueForModal}
        changeDate={changeDate}
        isOpen={editMode && type === 'date'}
        timeDisplay
      />
      <button
        ref={containerRef}
        type="button"
        disabled={!editable}
        onClick={onClickContainer}
        {...GridColumnStyle.container({
          width,
          backgroundColor,
          borderCSS,
          clickable: !!onChange && (type !== 'date' || !!format),
          editable,
          fontSize,
          fontColor,
          justify,
          style,
          className,
        })}
        data-testid="components.grids.column.container">
        {label}
      </button>
    </>
  )
}

GridColumn.defaultProps = {
  type: undefined,
  children: undefined,
  options: undefined,
  onChange: undefined,
  nullable: false,
  format: 'YYYY-MM-DD HH:mm:ss',
  width: '4rem',
  justify: 'start',
  editable: false,
  backgroundColor: 'mono-white',
  fontColor: 'mono-black',
  fontSize: 'textMedium',
  style: undefined,
  className: undefined,
}

export default React.memo(GridColumn)
