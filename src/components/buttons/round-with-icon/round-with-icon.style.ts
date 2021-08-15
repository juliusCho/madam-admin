import helpers from '../../../utils/helpers'

interface StyleProps {
  active: boolean
  disabled: boolean
  colorDisabled?: string
  colorActive?: string
  colorInactive?: string
}

const ButtonRoundWithIconStyle = {
  container({
    active,
    disabled,
    colorDisabled,
    colorActive,
    colorInactive,
  }: StyleProps) {
    let color = ''

    if (disabled) {
      color = `${helpers.convertColorToTailwind(
        'bg',
        colorDisabled,
        disabled,
      )} cursor-not-allowed text-mono-white`
    } else {
      color = active
        ? `${helpers.convertColorToTailwind(
            'bg',
            colorActive,
            false,
          )} border-solid border border-mono-gray min-w-px59 m-px text-mono-paleBlack`
        : `${helpers.convertColorToTailwind(
            'bg',
            colorInactive,
            false,
          )} text-mono-white`
    }

    return `
      h-8.5 
      p-2
      pr-4
      text-textMedium 
      font-textMedium
      rounded-full
      flex 
      justify-center 
      items-center 
      active:outline-none 
      select-none
      ${color}
    `
  },
  icon: `
    m-2
  `,
}

export default ButtonRoundWithIconStyle
