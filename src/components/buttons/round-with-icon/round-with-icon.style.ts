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
        colorDisabled || '',
        disabled,
      )} cursor-not-allowed text-mono-white`
    } else {
      color = active
        ? `${helpers.convertColorToTailwind(
            colorActive || '',
            false,
          )} text-mono-white`
        : `${helpers.convertColorToTailwind(
            colorInactive || '',
            false,
          )} border-solid min-w-px59 m-px border border-mono-gray  text-mono-paleBlack`
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
