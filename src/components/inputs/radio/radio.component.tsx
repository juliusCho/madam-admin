import React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import {
  SelectOptionType,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import RadioStyle from './radio.style'

export interface InputRadioProps {
  options: SelectOptionType<string | number | boolean | null>[]
  onSelect: (value?: string | number | boolean | null) => void
  value?: string | number | boolean
  width?: string | number
  backgroundColor?: TailwindColorPalette
  marginInBetween?: string | number
  fontColor?: TailwindColorPalette
  fontColorSelected?: TailwindColorPalette
  fontSize?: TailwindFontSize
  style?: React.CSSProperties
  className?: string
}

function InputRadio({
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
}: InputRadioProps) {
  const getItem = React.useCallback(
    (
      label: string,
      index: number,
      inputValue?: string | number | boolean | null,
    ) => (
      <li
        key={`${label}-${String(index)}`}
        role="option"
        aria-selected={value === inputValue}
        onClick={() => onSelect(inputValue)}
        onKeyPress={(e) => e.preventDefault()}
        tabIndex={index}
        {...RadioStyle.item({
          selected: value === inputValue,
          marginInBetween,
          fontSize,
          color: fontColor,
          colorSelected: fontColorSelected,
        })}>
        <XEIcon
          {...RadioStyle.icon({
            selected: value === inputValue,
            fontSize,
            color: fontColor,
            colorSelected: fontColorSelected,
          })}
          onClick={() => onSelect(inputValue)}
        />
        {label}
      </li>
    ),
    [
      value,
      marginInBetween,
      fontSize,
      fontColor,
      fontColorSelected,
      onSelect,
      RadioStyle.item,
      RadioStyle.icon,
    ],
  )

  return (
    <ul
      {...RadioStyle.container({
        width,
        backgroundColor,
        style,
        className,
      })}>
      {getItem('전체', 0)}
      {options.map((item, idx) => getItem(item.label, idx + 1, item.value))}
    </ul>
  )
}

InputRadio.defaultProps = {
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

export default React.memo(InputRadio)
