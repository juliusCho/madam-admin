import { ScreenOptionType } from '~/types'
import helpers from '~/utils/helpers'

interface StyleProps {
  device?: ScreenOptionType
}

interface AdditionalStyleProps extends StyleProps {
  disabled?: boolean
}

const SearchChartDateStyle = {
  container: `
    flex
    justify-between
    items-center
    w-full
    px-4
    pb-4
  `,
  leftCallerContainer: `
    flex
    justify-start
    items-center
    ml-7
  `,
  optionContainer({ device, disabled }: AdditionalStyleProps) {
    return `
      ml-2
      relative
      flex
      justify-center
      items-center
      rounded-full
      ${disabled ? 'cursor-not-allowed' : ''}
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'text-textMedium font-textMedium h-7 w-24 pl-5 py-3.5 border'
          : 'text-subTitleMedium font-subTitleMedium h-13 w-72 pl-10 border-2 '
      }
      ${helpers.convertColorToTailwind('border', 'main-red', disabled)}
      ${helpers.convertColorToTailwind('text', 'mono-black', disabled)}
      ${helpers.convertColorToTailwind('bg', 'mono-white', disabled)}
    `
  },
  calendarCaller({ device }: StyleProps) {
    return `
      p-2
      ml-2
      rounded-full
      border-solid
      ${helpers.convertColorToTailwind('border', 'main-darkNavy')}
      ${helpers.convertColorToTailwind('bg', 'main-navy')}
      ${device === 'mobile' || device === 'smallScreen' ? 'border' : 'border-2'}
    `
  },
  optionCaller({ disabled }: AdditionalStyleProps) {
    return `
      p-2
      rounded-full
      absolute
      z-10
      top-0
      left-0
      ${helpers.convertColorToTailwind('bg', 'main-red', disabled)}
      ${disabled ? 'cursor-not-allowed' : ''}
    `
  },
  optionDateLabel({ disabled }: AdditionalStyleProps) {
    return `
      ml-2
      text-textSmall
      font-textSmall
      ${helpers.convertColorToTailwind('text', 'mono-paleBlack', disabled)}
    `
  },
  dividerClassName: `
    bg-transparent
    mx-2
  `,
  prevNextClassName({ device }: StyleProps) {
    return `
      border-solid
      rounded-full
      ${device === 'mobile' || device === 'smallScreen' ? 'border' : 'border-2'}
    `
  },
  icon(
    name: string,
    device: ScreenOptionType,
    color: string,
    disabled?: boolean,
  ) {
    return {
      name,
      color: disabled ? 'mono-gray' : color,
      size:
        device === 'mobile' || device === 'smallScreen' ? '0.75rem' : '2rem',
    }
  },
}

export default SearchChartDateStyle
