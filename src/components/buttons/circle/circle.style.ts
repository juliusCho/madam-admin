import helpers from '../../../utils/helpers'

interface ButtonStyleProps {
  borderColor?: string
  backgroundColor?: string
  padding?: number
}

interface TextStyleProps {
  color?: string
  fontSize?: string
}

const ButtonCircleStyle = {
  button({ borderColor, backgroundColor, padding }: ButtonStyleProps) {
    return `
      flex
      justify-center
      items-center
      p-${padding || 0}
      ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
      ${helpers.convertColorToTailwind('border', borderColor, true)}
    `
  },
  text({ fontSize, color }: TextStyleProps) {
    return `
      ${helpers.convertTextToTailwind(fontSize)}
      ${helpers.convertColorToTailwind('text', color, true)}
    `
  },
}

export default ButtonCircleStyle
