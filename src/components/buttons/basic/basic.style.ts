import {
  BorderRadius,
  BorderStyle,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import * as helpers from '~/utils/helpers'

interface ButtonStyleProps {
  disabled?: boolean
  padding?: number
  backgroundColor?: TailwindColorPalette
  borderStyle?: BorderStyle
  borderBold?: boolean
  borderRadius?: BorderRadius
  borderColor?: TailwindColorPalette
}

interface TextStyleProps {
  disabled?: boolean
  fontSize?: TailwindFontSize
  color?: TailwindColorPalette
}

interface IconStyleProps extends ButtonStyleProps, TextStyleProps {
  icon: string
}

const ButtonBasicStyle = {
  button({
    disabled,
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
      ${disabled ? 'cursor-not-allowed' : ''}
      ${helpers.convertColorToTailwind('border', 'mono-black', disabled)}
      ${helpers.convertColorToTailwind(
        'bg',
        disabled ? 'mono-darkGray' : backgroundColor,
        disabled,
      )}
      ${
        disabled
          ? ''
          : helpers.convertBorderStyleToTailwindClass(borderStyle, borderBold)
      }
      ${helpers.convertBorderRadiusToTailwindClass(borderRadius)}
      ${helpers.convertColorToTailwind('border', borderColor, disabled)}
    `
  },
  text({ fontSize, color, disabled }: TextStyleProps) {
    return `
      m-1
      ${helpers.convertFontToTailwindClass(fontSize)}
      ${helpers.convertColorToTailwind(
        'text',
        disabled ? 'mono-white' : color,
        disabled,
      )}
    `
  },
  icon({
    disabled,
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
        ${helpers.convertColorToTailwind(
          'text',
          disabled ? 'mono-white' : 'mono-black',
          disabled,
        )}
        ${helpers.convertColorToTailwind('bg', backgroundColor, disabled)}
        ${helpers.convertBorderStyleToTailwindClass(borderStyle, borderBold)}
        ${helpers.convertBorderRadiusToTailwindClass(borderRadius)}
        ${helpers.convertColorToTailwind('border', borderColor, disabled)}
      `,
    }
  },
}

export default ButtonBasicStyle
