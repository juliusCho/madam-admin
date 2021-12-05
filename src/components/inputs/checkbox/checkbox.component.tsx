import React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import {
  SelectOptionType,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import CheckboxStyle from './checkbox.style'

export interface InputCheckboxProps {
  options: SelectOptionType<string | number | null>[]
  onSelect: (value?: string | number | null) => void
  value?: Array<string | number | null>
  width?: string | number
  backgroundColor?: TailwindColorPalette
  marginInBetween?: string | number
  fontColor?: TailwindColorPalette
  fontColorSelected?: TailwindColorPalette
  fontSize?: TailwindFontSize
  style?: React.CSSProperties
  className?: string
}

function InputCheckbox({
  options,
  onSelect,
  value,
  width,
  backgroundColor,
  marginInBetween,
  fontColor,
  fontColorSelected,
  fontSize,
  style,
  className,
}: InputCheckboxProps) {
  const getItem = React.useCallback(
    (
      all: boolean,
      label: string,
      index: number,
      inputValue?: string | number | null,
    ) => {
      const selected = all
        ? !!value && !options.some((o) => !value.includes(o.value))
        : value?.some((val) => val === inputValue)

      return (
        <li
          key={`${label}-${String(index)}`}
          role="option"
          aria-selected={selected}
          onClick={() => onSelect(inputValue)}
          onKeyPress={(e) => e.preventDefault()}
          tabIndex={index}
          {...CheckboxStyle.item({
            selected,
            marginInBetween,
            fontSize,
            color: fontColor,
            colorSelected: fontColorSelected,
          })}>
          <XEIcon
            {...CheckboxStyle.icon({
              selected,
              fontSize,
              color: fontColor,
              colorSelected: fontColorSelected,
            })}
          />
          {label}
        </li>
      )
    },
    [
      value,
      options,
      marginInBetween,
      fontSize,
      fontColor,
      fontColorSelected,
      onSelect,
      CheckboxStyle.item,
      CheckboxStyle.icon,
    ],
  )

  return (
    <ul
      {...CheckboxStyle.container({
        width,
        backgroundColor,
        style,
        className,
      })}>
      {getItem(true, '전체', 0)}
      {options.map((item, idx) =>
        getItem(false, item.label, idx + 1, item.value),
      )}
    </ul>
  )
}

InputCheckbox.defaultProps = {
  value: undefined,
  width: undefined,
  backgroundColor: undefined,
  marginInBetween: '0.5rem',
  fontColor: 'mono-black',
  fontColorSelected: 'main-blue',
  fontSize: 'textMedium',
  style: undefined,
  className: undefined,
}

export default React.memo(InputCheckbox)
