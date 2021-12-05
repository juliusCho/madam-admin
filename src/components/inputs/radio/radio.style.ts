import { CSSProperties } from 'react'
import { TailwindColorPalette, TailwindFontSize } from '~/types'
import * as helpers from '~/utils/helpers'

interface ContainerStyle {
  width?: string | number
  backgroundColor?: TailwindColorPalette
  style?: CSSProperties
  className?: string
}

interface ItemStyle {
  selected?: boolean
  marginInBetween?: string | number
  fontSize?: TailwindFontSize
  color?: TailwindColorPalette
  colorSelected?: TailwindColorPalette
}

const RadioStyle = {
  container({ width, backgroundColor, style, className }: ContainerStyle) {
    return {
      className: `
        flex
        justify-between
        items-center
        w-full
        ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
        ${className ?? ''}
      `,
      style: {
        width,
        ...style,
      },
    }
  },
  item({
    selected,
    marginInBetween,
    fontSize,
    color,
    colorSelected,
  }: ItemStyle) {
    return {
      className: `
        flex
        justify-center
        items-center
        cursor-pointer
        ${helpers.convertFontToTailwindClass(fontSize)}
        ${helpers.convertColorToTailwind(
          'text',
          selected ? colorSelected : color,
        )}
      `,
      style: {
        margin: marginInBetween,
      },
    }
  },
  icon({ selected, fontSize, color, colorSelected }: ItemStyle) {
    return {
      name: selected ? 'radiobox-checked' : 'radiobox-blank',
      className: `mr-2`,
      size: helpers.convertFontSizeToCSSSize(fontSize),
      color: selected ? colorSelected : color,
      testID: 'components.inputs.radio.icon',
    }
  },
}

export default RadioStyle
