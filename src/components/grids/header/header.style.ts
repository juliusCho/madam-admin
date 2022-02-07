import { CSSProperties } from 'react'
import { BorderCSS, TailwindColorPalette, TailwindFontSize } from '~/types'
import {
  convertBorderCSSToTailwind,
  convertColorToTailwind,
  convertFontToTailwindClass,
} from '~/utils/helpers'

interface FontStyle {
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
}

interface ContainerStyle extends FontStyle {
  backgroundColor?: TailwindColorPalette
  borderCSS?: BorderCSS
  oneItemExists?: boolean
  clickable?: boolean
  width?: string | number
  style?: CSSProperties
  className?: string
}

interface CheckStyle extends FontStyle {
  checked?: boolean
}

interface SortStyle extends Omit<FontStyle, 'fontColor'> {
  type?: 'asc' | 'desc'
}

const GridHeaderStyle = {
  container({
    backgroundColor,
    borderCSS,
    width,
    oneItemExists,
    clickable,
    style,
    className,
    fontSize,
    fontColor,
  }: ContainerStyle) {
    return {
      className: `
        p-2
        h-12
        flex
        items-center
        ${clickable ? '' : 'cursor-default'}
        ${oneItemExists ? 'justify-center' : 'justify-between'}
        ${convertColorToTailwind('bg', backgroundColor, !clickable)}
        ${convertBorderCSSToTailwind(borderCSS ?? {})}
        ${convertColorToTailwind('text', fontColor, !clickable)}
        ${convertFontToTailwindClass(fontSize)}
        ${className ?? ''}
      `,
      style: {
        width,
        ...style,
      },
    }
  },
  checkbox({ fontColor, checked }: CheckStyle) {
    return {
      className: `
        bg-mono-white
        ${checked ? 'xi-check-square-o' : 'xi-checkbox-blank'}
        ${convertColorToTailwind('bg', fontColor, true)}
        text-titleMedium
      `,
    }
  },
  sort({ fontSize, type }: SortStyle) {
    let icon = 'xi-arrows-v text-sub-greenActive'
    if (type) {
      icon =
        type === 'asc'
          ? 'xi-arrow-up text-main-blue'
          : 'xi-arrow-down text-main-red'
    }

    return {
      className: `
        ${icon}
        ${convertFontToTailwindClass(fontSize)}
      `,
    }
  },
}

export default GridHeaderStyle
