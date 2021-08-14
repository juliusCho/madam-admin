const convertToTailwindClass = (color: string, disabled?: boolean) => {
  const tc = color.split('.')
  return `bg-${tc[0]}-${tc[1]}${
    disabled
      ? ''
      : ` hover:bg-${tc[0]}Hover-${tc[1]} active:bg-${tc[0]}Active-${tc[1]}`
  }`
}

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
      color = `${convertToTailwindClass(
        colorDisabled || '',
        disabled,
      )} cursor-not-allowed text-mono-white`
    } else {
      color = active
        ? `${convertToTailwindClass(
            colorActive || '',
          )} border-solid border border-mono-gray min-w-px59 m-px text-mono-paleBlack`
        : `${convertToTailwindClass(colorInactive || '')} text-mono-white`
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
