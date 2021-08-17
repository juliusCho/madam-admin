import helpers from '../../../utils/helpers'

interface StyleProps {
  color: string
  disabled?: boolean
  disabledColor?: string
}

interface InputContainerStyleProps extends StyleProps {
  borderColor: string
}

interface InputStyleProps extends StyleProps {
  placeholderColor: string
  disabledPlaceholderColor?: string
}

const InputTextLineStyle = {
  container: `
    flex 
    justify-between 
    items-center
  `,
  inputContainer({
    color,
    borderColor,
    disabled,
    disabledColor,
  }: InputContainerStyleProps) {
    return `
      h-10
      w-full
      flex 
      justify-end 
      items-center 
      border-b
      border-solid 
      rounded-md 
      p-1
      px-2
      pb-2
      ${
        disabled
          ? helpers.convertColorToTailwind(
              disabledColor || 'mono.lightGray',
              true,
            )
          : helpers.convertColorToTailwind(color, false)
      } ${helpers.convertColorToTailwind(borderColor, disabled)}
    `
  },
  input({
    color,
    placeholderColor,
    disabled,
    disabledColor,
    disabledPlaceholderColor,
  }: InputStyleProps) {
    return `
      border-none 
      text-textThin 
      font-textThin
      rounded-md 
      h-full 
      w-full 
      z-0 
      mr-2
      bg-transparent
      ${
        disabled
          ? helpers.convertColorToTailwind(
              disabledPlaceholderColor || 'mono.darkGray',
              true,
            )
          : helpers.convertColorToTailwind(placeholderColor, false)
      } ${
      disabled
        ? helpers.convertColorToTailwind(
            disabledColor || 'mono.lightGray',
            true,
          )
        : helpers.convertColorToTailwind(color, false)
    }
    `
  },
  text({ input }: { input: boolean }) {
    return input
      ? 'text-textRegular font-textRegular'
      : 'text-textThin font-textThin'
  },
  axe: `
    bg-transparent 
    z-10 
    text-textMedium
    font-textMedium
  `,
}

export default InputTextLineStyle