import helpers from '../../../utils/helpers'

interface StyleProps {
  backgroundColor?: string
}

interface OptionStyleProps {
  selected: boolean
}

const ModalDatePickerOptionStyle = {
  container({ backgroundColor }: StyleProps) {
    return `
      fixed
      top-0
      left-0
      bg-opacity-50
      z-max
      w-full
      h-full
      flex
      justify-center
      items-center
      ${helpers.convertColorToTailwind(backgroundColor, true)}
    `
  },
  buttonArea: `
    flex
    flex-col
    justify-center
    items-center
    w-52
    rounded-md
  `,
  button({ selected }: OptionStyleProps) {
    return `
      w-full
      flex
      justify-center
      items-center
      p-2
      border
      border-solid
      border-main-navy
      text-subTitleBig
      font-subTitleBig
      ${
        selected
          ? `bg-main-navy hover:bg-main-navyHover active:bg-main-navyActive
            text-mono-white hover:text-mono-whiteHover active:text-mono-whiteActive`
          : `bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive
            text-mono-black hover:text-mono-blackHover active:text-mono-blackActive`
      }
    `
  },
}

export default ModalDatePickerOptionStyle
