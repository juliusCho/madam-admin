import helpers from '~/utils/helpers'

interface ButtonStyleProps {
  padding?: number
  backgroundColor?: string
}

interface TextStyleProps {
  fontSize?: string
  color?: string
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
      ${helpers.convertTextToTailwind(fontSize)}
      ${helpers.convertColorToTailwind('text', color)}
    `
  },
}

export default ButtonCircleStyle
