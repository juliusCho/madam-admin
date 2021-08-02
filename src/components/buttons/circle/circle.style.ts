import helpers from '../../../utils/helpers'

interface ButtonStyleProps {
  buttonSize?: number
  borderWidth?: number | string
  borderColor?: string
  backgroundColor?: string
  padding?: number
}

interface TextStyleProps {
  color?: string
  fontSize?: string
}

const ButtonCircleStyle = {
  button({
    buttonSize,
    borderWidth,
    borderColor,
    backgroundColor,
    padding,
  }: ButtonStyleProps) {
    return `
      flex
      justify-center
      items-center
      rounded-full
      w-${buttonSize}
      h-${buttonSize}
      p-${padding || 0}
      ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
      ${helpers.convertColorToTailwind('border', borderColor, true)}
      border${borderWidth ? `-${borderWidth}` : ''}
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
