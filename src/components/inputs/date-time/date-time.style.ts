import helpers from '../../../utils/helpers'

interface StyleProps {
  color: string
  disabled?: boolean
  disabledColor?: string
}

interface ButtonStyleProps extends StyleProps {
  borderColor: string
  disabledBorderColor: string
}

interface LabelStyleProps extends StyleProps {
  active: boolean
  activeColor: string
}

const InputDateTimeStyle = {
  container({
    color,
    disabled,
    disabledColor,
    borderColor,
    disabledBorderColor,
  }: ButtonStyleProps) {
    return `
      flex 
      items-center
      rounded-full
      w-full
      h-9
      border
      border-solid
      ${disabled ? 'cursor-not-allowed' : ''}
      ${
        disabled
          ? helpers.convertColorToTailwind(
              'bg',
              disabledColor ?? 'mono-lightGray',
              true,
            )
          : helpers.convertColorToTailwind('bg', color)
      }
      ${
        disabled
          ? helpers.convertColorToTailwind('border', disabledBorderColor, true)
          : helpers.convertColorToTailwind('border', borderColor)
      }
    `
  },
  text({
    active,
    disabled,
    activeColor,
    color,
    disabledColor,
  }: LabelStyleProps) {
    if (disabled) {
      return `${helpers.convertColorToTailwind(
        'text',
        disabledColor ?? 'mono-lightGray',
        true,
      )} text-textSmall font-textSmall px-2`
    }
    return active
      ? `${helpers.convertColorToTailwind(
          'text',
          activeColor,
        )} text-textMedium font-textMedium px-2`
      : `${helpers.convertColorToTailwind(
          'text',
          color,
        )} text-textSmall font-textSmall px-2`
  },
  axe: `
    bg-transparent 
    z-10 
    ${helpers.convertTextToTailwind('textMedium')}
    mr-3
    px-2
  `,
}

export default InputDateTimeStyle
