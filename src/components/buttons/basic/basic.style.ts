import {
  BorderRadius,
  BorderStyle,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import * as helpers from '~/utils/helpers'

interface ButtonStyleProps {
  padding?: number
  backgroundColor?: TailwindColorPalette
  borderStyle?: BorderStyle
  borderBold?: boolean
  borderRadius?: BorderRadius
  borderColor?: TailwindColorPalette
}

interface TextStyleProps {
  fontSize?: TailwindFontSize
  color?: TailwindColorPalette
}

interface IconStyleProps extends ButtonStyleProps, TextStyleProps {
  icon: string
}

const ButtonBasicStyle = {
  button({
    padding,
    backgroundColor,
    borderStyle,
    borderBold,
    borderRadius,
    borderColor,
  }: ButtonStyleProps) {
    return `
      flex
      justify-center
      items-center
      p-${padding || 0}
      ${helpers.convertColorToTailwind('border', 'mono-black')}
      ${helpers.convertColorToTailwind('bg', backgroundColor)}
      ${helpers.convertBorderStyleToTailwindClass(borderStyle, borderBold)}
      ${helpers.convertBorderRadiusToTailwindClass(borderRadius)}
      ${helpers.convertColorToTailwind('border', borderColor)}
    `
  },
  text({ fontSize, color }: TextStyleProps) {
    return `
      m-1
      ${helpers.convertFontToTailwindClass(fontSize)}
      ${helpers.convertColorToTailwind('text', color)}
    `
  },
  icon({
    icon,
    padding,
    backgroundColor,
    borderStyle,
    borderBold,
    borderRadius,
    borderColor,
    color,
    fontSize,
  }: IconStyleProps) {
    return {
      name: icon,
      size: helpers.convertFontSizeToCSSSize(fontSize),
      color,
      className: `
        p-${padding || 0}
        ${helpers.convertColorToTailwind('border', 'mono-black')}
        ${helpers.convertColorToTailwind('bg', backgroundColor)}
        ${helpers.convertBorderStyleToTailwindClass(borderStyle, borderBold)}
        ${helpers.convertBorderRadiusToTailwindClass(borderRadius)}
        ${helpers.convertColorToTailwind('border', borderColor)}
      `,
    }
  },
}

export default ButtonBasicStyle
