import { ScreenOptionType } from '../../../types'
import helpers from '../../../utils/helpers'

interface StyleProps {
  device: ScreenOptionType
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
  optionContainer({ device }: StyleProps) {
    return `
      ml-3
      relative
      flex
      justify-center
      items-center
      rounded-full
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'text-textBig font-textBig h-7 w-24 pl-5 py-3.5 border'
          : 'text-subTitleBig font-subTitleBig h-13 w-32 pl-10 border-2 '
      }
      ${helpers.convertColorToTailwind('border', 'main-red')}
      ${helpers.convertColorToTailwind('text', 'mono-black')}
      ${helpers.convertColorToTailwind('bg', 'sub-babyPink')}
    `
  },
  calendarCaller({ device }: StyleProps) {
    return `
      p-2
      ml-3
      rounded-full
      border-solid
      ${helpers.convertColorToTailwind('border', 'main-darkNavy')}
      ${helpers.convertColorToTailwind('bg', 'main-navy')}
      ${device === 'mobile' || device === 'smallScreen' ? 'border' : 'border-2'}
    `
  },
  optionCaller: `
    p-2
    rounded-full
    absolute
    z-10
    top-0
    left-0
    ${helpers.convertColorToTailwind('bg', 'main-red')}
  `,
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
      className: disabled ? 'cursor-not-allowed' : undefined,
    }
  },
}

export default SearchChartDateStyle
