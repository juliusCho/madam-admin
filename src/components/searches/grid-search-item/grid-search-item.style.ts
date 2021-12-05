import { CSSProperties } from 'react'
import { BorderCSS, TailwindColorPalette, TailwindFontSize } from '~/types'
import {
  convertBorderCSSToTailwind,
  convertBorderStyleToTailwindClass,
  convertColorToTailwind,
  convertFontToTailwindClass,
} from '~/utils/helpers'

interface StyleProps {
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  borderCSS: BorderCSS
}

interface ContainerStyle extends StyleProps {
  width?: string | number
  backgroundColor?: TailwindColorPalette
  style?: CSSProperties
  className?: string
}

const SearchGridSearchItemStyle = {
  container({
    width,
    backgroundColor,
    style,
    className,
    borderCSS,
  }: ContainerStyle) {
    return {
      className: `
        flex
        flex-col
        justify-start
        items-center
        ${convertColorToTailwind('bg', backgroundColor, true)}
        ${convertBorderCSSToTailwind(borderCSS)}
        ${className ?? ''}
      `,
      style: {
        width,
        ...style,
      },
    }
  },
  label({ fontSize, fontColor, borderCSS }: StyleProps) {
    return {
      className: `
        w-full
        flex
        justify-center
        items-center
        p-1
        ${convertBorderStyleToTailwindClass(
          borderCSS.borderStyle,
          borderCSS.borderBold,
          'bottom',
        )}
        ${convertColorToTailwind('border', borderCSS.borderColor, true)}
        ${convertFontToTailwindClass(fontSize)}
        ${convertColorToTailwind('text', fontColor, true)}
      `,
    }
  },
  contentContainer(height?: string | number) {
    return {
      className: `
        w-full
        flex
        justify-start
        items-center
        p-1
      `,
      style: {
        height,
      },
    }
  },
}

export default SearchGridSearchItemStyle
