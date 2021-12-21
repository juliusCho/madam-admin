import { CSSProperties } from 'react'
import { TailwindColorPalette, TailwindFontSize } from '~/types'
import {
  convertColorToTailwind,
  convertFontToTailwindClass,
} from '~/utils/helpers'

interface StyleProps {
  style?: CSSProperties
  className?: string
}

interface LabelStyle {
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  marginInBetween?: string | number
}

interface ArrowStyle {
  type: 'prev' | 'next'
  iconSize?: string | number
  iconColor?: TailwindColorPalette
}

const GridPagingStyle = {
  container({ style, className }: StyleProps) {
    return {
      className: `
        flex
        justify-center
        items-center
        ${className ?? ''}
      `,
      style,
    }
  },
  label({ fontSize, fontColor, marginInBetween }: LabelStyle) {
    return {
      className: `
        ${convertFontToTailwindClass(fontSize)}
        ${convertColorToTailwind('text', fontColor, true)}
      `,
      style: {
        margin: marginInBetween,
      },
    }
  },
  arrow({ type, iconSize, iconColor }: ArrowStyle) {
    return {
      name: type === 'prev' ? 'angle-left' : 'angle-right',
      size: iconSize,
      color: iconColor,
    }
  },
}

export default GridPagingStyle
