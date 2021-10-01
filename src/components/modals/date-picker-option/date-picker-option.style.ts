import helpers from '~/utils/helpers'

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
      ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
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
      ${helpers.convertColorToTailwind('border', 'main-navy')}
      ${helpers.convertTextToTailwind('subTitleBig')}
      ${
        selected
          ? `${helpers.convertColorToTailwind('bg', 'main-navy')}
            ${helpers.convertColorToTailwind('text', 'mono-white')}`
          : `${helpers.convertColorToTailwind('bg', 'mono-white')}
            ${helpers.convertColorToTailwind('text', 'mono-black')}`
      }
    `
  },
}

export default ModalDatePickerOptionStyle
