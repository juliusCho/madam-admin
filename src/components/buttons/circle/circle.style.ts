import { TailwindColorPalette, TailwindFontSize } from '~/types'
import * as helpers from '~/utils/helpers'

interface ButtonStyleProps {
  padding?: number
  backgroundColor?: TailwindColorPalette
}

interface TextStyleProps {
  fontSize?: TailwindFontSize
  color?: TailwindColorPalette
}

const ButtonCircleStyle = {
  button({ padding, backgroundColor }: ButtonStyleProps) {
    return `
      flex
      justify-center
      items-center
      rounded-full
      p-${padding || 0}
      ${helpers.convertColorToTailwind('border', 'mono-black')}
      ${helpers.convertColorToTailwind('bg', backgroundColor)}
    `
  },
  text({ fontSize, color }: TextStyleProps) {
    return `
      ${helpers.convertFontToTailwindClass(fontSize)}
      ${helpers.convertColorToTailwind('text', color)}
    `
  },
}

export default ButtonCircleStyle
