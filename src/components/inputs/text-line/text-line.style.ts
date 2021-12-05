import { TailwindColorPalette } from '~/types'
import * as helpers from '~/utils/helpers'

interface StyleProps {
  color?: TailwindColorPalette
  disabled?: boolean
  disabledColor?: TailwindColorPalette
}

interface InputContainerStyleProps extends StyleProps {
  borderColor?: TailwindColorPalette
}

interface InputStyleProps extends StyleProps {
  placeholderColor?: TailwindColorPalette
  disabledPlaceholderColor?: TailwindColorPalette
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
              'bg',
              disabledColor ?? 'mono-lightGray',
              true,
            )
          : helpers.convertColorToTailwind('bg', color, false)
      } ${helpers.convertColorToTailwind('border', borderColor, disabled)}
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
      ${helpers.convertFontToTailwindClass('textSmall')}
      rounded-md 
      h-full 
      w-full 
      z-0 
      mr-2
      bg-transparent
      ${
        disabled
          ? helpers.convertColorToTailwind(
              'placeholder',
              disabledPlaceholderColor ?? 'mono-darkGray',
              true,
            )
          : helpers.convertColorToTailwind(
              'placeholder',
              placeholderColor,
              false,
            )
      } ${
      disabled
        ? helpers.convertColorToTailwind(
            'text',
            disabledColor || 'mono-lightGray',
            true,
          )
        : helpers.convertColorToTailwind('text', color, false)
    }
    `
  },
  text({ input }: { input: boolean }) {
    return input
      ? 'text-textMedium font-textMedium'
      : 'text-textSmall font-textSmall'
  },
  axe: `
    bg-transparent 
    z-10 
    ${helpers.convertFontToTailwindClass('textMedium')}
  `,
}

export default InputTextLineStyle
