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
  editable?: boolean
  borderCSS?: BorderCSS
  clickable?: boolean
  justify?: 'center' | 'start' | 'end'
  width?: string | number
  style?: CSSProperties
  className?: string
}

interface CheckStyle extends FontStyle {
  checked?: boolean
}

interface InputStyle extends FontStyle {
  placeholderSize?: TailwindFontSize
  placeholderColor?: TailwindColorPalette
}

const GridColumnStyle = {
  container({
    backgroundColor,
    borderCSS,
    clickable,
    editable,
    justify,
    width,
    fontSize,
    fontColor,
    style,
    className,
  }: ContainerStyle) {
    return {
      className: `
        p-0.5
        h-12
        flex
        items-center
        border border-solid border-mono-darkGray
        justify-${justify}
        ${editable ? '' : 'cursor-default'}
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
  input({
    placeholderColor,
    placeholderSize,
    fontColor,
    fontSize,
  }: InputStyle) {
    return {
      className: `
        w-full
        h-full
        bg-transparent
        border-none
        ${convertColorToTailwind('text', fontColor)}
        ${convertFontToTailwindClass(fontSize)}
        ${convertColorToTailwind('placeholder', placeholderColor)}
        ${convertFontToTailwindClass(placeholderSize)}
      `,
    }
  },
  checkbox({ fontSize, fontColor, checked }: CheckStyle) {
    return {
      className: `
        bg-mono-white
        ${checked ? 'xi-check-square-o' : 'xi-checkbox-blank'}
        ${convertColorToTailwind('text', fontColor)}
        ${convertFontToTailwindClass(fontSize)}
      `,
    }
  },
  crud(type: 'c' | 'r' | 'u' | 'd', font: FontStyle) {
    const { fontSize } = font

    return {
      className: `
        rounded-full
        flex
        justify-center
        items-center
        p-1
        ${type === 'r' ? '' : `crud-${type}`}
        ${convertFontToTailwindClass(fontSize)}
      `,
    }
  },
}

export default GridColumnStyle
