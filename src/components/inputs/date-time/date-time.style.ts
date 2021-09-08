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
      bg-mono-lightGray
      ${disabled ? 'cursor-not-allowed' : ''}
      ${
        disabled
          ? helpers.convertColorToTailwind(
              disabledColor || 'bg-mono-lightGray',
              true,
            )
          : helpers.convertColorToTailwind(color)
      }
      ${
        disabled
          ? helpers.convertColorToTailwind(disabledBorderColor, true)
          : helpers.convertColorToTailwind(borderColor)
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
        disabledColor || 'text-mono-lightGray',
        true,
      )} text-textSmall font-textSmall px-2`
    }
    return active
      ? `${helpers.convertColorToTailwind(
          activeColor,
        )} text-textMedium font-textMedium px-2`
      : `${helpers.convertColorToTailwind(
          color,
        )} text-textSmall font-textSmall px-2`
  },
  axe: `
    bg-transparent 
    z-10 
    text-textMedium
    font-textMedium
    mr-3
    px-2
  `,
}

export default InputDateTimeStyle
