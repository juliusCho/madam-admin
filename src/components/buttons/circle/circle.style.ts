import helpers from '../../../utils/helpers'

interface ButtonStyleProps {
  padding?: number
}

interface TextStyleProps {
  fontSize?: string
}

const ButtonCircleStyle = {
  button({ padding }: ButtonStyleProps) {
    return `
      flex
      justify-center
      items-center
      rounded-full
      p-${padding || 0}
      border-mono-black
    `
  },
  text({ fontSize }: TextStyleProps) {
    return helpers.convertTextToTailwind(fontSize)
  },
}

export default ButtonCircleStyle
