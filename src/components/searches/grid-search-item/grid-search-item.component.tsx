import React from 'react'
import { InputCheckbox } from '~/components/inputs/checkbox'
import { InputDateTime } from '~/components/inputs/date-time'
import { InputMultiSelect } from '~/components/inputs/multi-select'
import { InputRadio } from '~/components/inputs/radio'
import { InputSingleSelect } from '~/components/inputs/single-select'
import { BorderCSS, TailwindColorPalette, TailwindFontSize } from '~/types'
import SearchGridSearchItemStyle from './grid-search-item.style'

export interface SearchGridSearchItemProps {
  type: 'single-select' | 'multi-select' | 'radio' | 'checkbox' | 'date'
  label: string
  onSelect: (
    value?:
      | string
      | number
      | null
      | boolean
      | Array<string | number | null | boolean>
      | [Date | Date]
      | [Date | undefined]
      | [undefined | Date]
      | [undefined | undefined],
  ) => void
  options?:
    | Array<{ value: string | number | null | boolean; label: string }>
    | [Date | Date]
    | [undefined | Date]
    | [Date | undefined]
    | [undefined | undefined]
  value?:
    | string
    | number
    | null
    | boolean
    | Array<string | number | null | boolean>
    | [Date, Date]
  placeholder?: string
  width?: string | number
  contentHeight?: string | number
  backgroundColor?: TailwindColorPalette
  borderCSS?: BorderCSS
  labelFontSize?: TailwindFontSize
  labelFontColor?: TailwindColorPalette
  placeholderColor?: TailwindColorPalette
  valueFontSize?: TailwindFontSize
  valueFontColor?: TailwindColorPalette
  style?: React.CSSProperties
  className?: string
}

function SearchGridSearchItem({
  type,
  label,
  onSelect,
  options,
  value,
  placeholder,
  width,
  contentHeight,
  backgroundColor,
  borderCSS,
  labelFontSize,
  labelFontColor,
  placeholderColor,
  valueFontSize,
  valueFontColor,
  style,
  className,
}: SearchGridSearchItemProps) {
  const content = React.useMemo(() => {
    switch (type) {
      case 'single-select':
        return options ? (
          <InputSingleSelect
            options={(
              [
                {
                  value: null,
                  label: placeholder,
                  isSelected: !value,
                },
              ] as Array<{
                value: string | number | null
                label: string
                isSelected?: boolean
              }>
            ).concat(
              (
                options as Array<{
                  value: string | number | null
                  label: string
                }>
              ).map((option) =>
                option.value === value
                  ? { ...option, isSelected: true }
                  : option,
              ),
            )}
            onChange={(val) => onSelect(val)}
            value={value as string | number}
            placeholder={placeholder}
            isClearable
            width="100%"
            fontSize={valueFontSize}
            fontColor={valueFontColor}
          />
        ) : null
      case 'multi-select':
        return options ? (
          <InputMultiSelect
            options={(
              [
                {
                  value: null,
                  label: placeholder,
                  isSelected:
                    !value ||
                    (Array.isArray(value) &&
                      (value as Array<string | number | null>).length === 0),
                },
              ] as Array<{
                value: string | number | null
                label: string
                isSelected?: boolean
              }>
            ).concat(
              (
                options as Array<{
                  value: string | number | null
                  label: string
                }>
              ).map((option) =>
                (value as Array<string | number | null>).some(
                  (val) => val === option.value,
                )
                  ? { ...option, isSelected: true }
                  : option,
              ),
            )}
            onChange={(val) => onSelect(val)}
            value={value as Array<string | number>}
            placeholder={placeholder}
            isClearable
            width="100%"
            fontSize={valueFontSize}
            fontColor={valueFontColor}
          />
        ) : null
      case 'radio':
        return options ? (
          <InputRadio
            options={(
              [
                {
                  value: null,
                  label: placeholder,
                  isSelected: !value,
                },
              ] as Array<{
                value: string | number | null | boolean
                label: string
                isSelected?: boolean
              }>
            ).concat(
              (
                options as Array<{
                  value: string | number | null | boolean
                  label: string
                }>
              ).map((option) =>
                option.value === value
                  ? { ...option, isSelected: true }
                  : option,
              ),
            )}
            onSelect={onSelect}
            value={value as string | number | boolean}
            width="100%"
            fontSize={valueFontSize}
            fontColor={valueFontColor}
          />
        ) : null
      case 'checkbox':
        return options ? (
          <InputCheckbox
            options={(
              [
                {
                  value: null,
                  label: placeholder,
                  isSelected:
                    !value ||
                    (Array.isArray(value) &&
                      (value as Array<string | number | null>).length === 0),
                },
              ] as Array<{
                value: string | number | null
                label: string
                isSelected?: boolean
              }>
            ).concat(
              (
                options as Array<{
                  value: string | number | null
                  label: string
                }>
              ).map((option) =>
                (value as Array<string | number | null>).some(
                  (val) => val === option.value,
                )
                  ? { ...option, isSelected: true }
                  : option,
              ),
            )}
            onSelect={onSelect}
            value={value as Array<string | number>}
            width="100%"
            fontSize={valueFontSize}
            fontColor={valueFontColor}
          />
        ) : null
      default:
        return (
          <InputDateTime
            onChange={(date) =>
              onSelect(
                date as
                  | [Date | Date]
                  | [Date | undefined]
                  | [undefined | Date]
                  | [undefined | undefined],
              )
            }
            date={value as undefined | Date | Array<Date | undefined>}
            range
            minDate={
              value && Array.isArray(value)
                ? (value[0] as undefined | Date)
                : undefined
            }
            maxDate={
              value && Array.isArray(value)
                ? (value[1] as undefined | Date)
                : undefined
            }
            textColor={valueFontColor}
            placeholderColor={placeholderColor}
          />
        )
    }
  }, [
    type,
    value,
    options,
    placeholder,
    onSelect,
    placeholderColor,
    valueFontColor,
    valueFontSize,
  ])

  return (
    <div
      {...SearchGridSearchItemStyle.container({
        width,
        backgroundColor,
        style,
        className,
        borderCSS: borderCSS ?? {},
      })}>
      <span
        {...SearchGridSearchItemStyle.label({
          fontSize: labelFontSize,
          fontColor: labelFontColor,
          borderCSS: borderCSS ?? {},
        })}>
        {label}
      </span>
      <div {...SearchGridSearchItemStyle.contentContainer(contentHeight)}>
        {content}
      </div>
    </div>
  )
}

SearchGridSearchItem.defaultProps = {
  options: undefined,
  value: undefined,
  placeholder: undefined,
  width: '5rem',
  contentHeight: '1.5rem',
  backgroundColor: 'mono-pale',
  borderCSS: {
    borderStyle: 'solid',
    borderBold: false,
    borderRadius: undefined,
    borderColor: 'mono-black',
  },
  labelFontSize: 'textBig',
  labelFontColor: 'mono-black',
  placeholderColor: 'mono-lightGray',
  valueFontSize: 'textMedium',
  valueFontColor: 'mono-black',
  style: undefined,
  className: undefined,
}

export default React.memo(SearchGridSearchItem)
