import * as helpers from '~/utils/helpers'
import { PrevNextType } from './prev-next.component'

const ButtonPrevNextStyle = {
  container: `
    flex
    justify-center
    items-center
  `,
  divider: `
    w-px
    h-8
  `,
  prevNext({
    disabled,
    backgroundColor,
    disabledBackgroundColor,
    fontSize,
    borderColor,
    disabledBorderColor,
    color,
    disabledColor,
    extraClassName,
  }: PrevNextType) {
    return `
      flex
      justify-center
      items-center
      p-2
      ${helpers.convertFontToTailwindClass(fontSize)}
      ${
        disabled
          ? `
            ${helpers.convertColorToTailwind(
              'bg',
              disabledBackgroundColor,
              true,
            )}
            ${helpers.convertColorToTailwind(
              'border',
              disabledBorderColor,
              true,
            )}
            ${helpers.convertColorToTailwind('text', disabledColor, true)}
            cursor-not-allowed
          `
          : `
            ${helpers.convertColorToTailwind('bg', backgroundColor)}
            ${helpers.convertColorToTailwind('border', borderColor)}
            ${helpers.convertColorToTailwind('text', color)}
          `
      }
      ${extraClassName}
    `
  },
}

export default ButtonPrevNextStyle
