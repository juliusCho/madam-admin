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
        flex
        items-center
        justify-${justify}
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
        ${convertColorToTailwind('bg', fontColor, true)}
        ${convertFontToTailwindClass(fontSize)}
      `,
    }
  },
}

export default GridColumnStyle
