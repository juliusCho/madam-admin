import helpers from '../../../utils/helpers'

interface StyleProps {
  device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen'
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
  calendarCaller({ device }: StyleProps) {
    return `
      p-2
      ml-3
      rounded-full
      border-solid
      ${helpers.convertColorToTailwind('border', 'mono-paleBlack')}
      ${device === 'mobile' || device === 'smallScreen' ? 'border' : 'border-2'}
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
    device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen',
    color: string,
    disabled?: boolean,
  ) {
    return {
      name,
      color: disabled ? 'mono-gray' : color,
      size:
        device === 'mobile' || device === 'smallScreen' ? '0.875rem' : '2rem',
      className: disabled ? 'cursor-not-allowed' : undefined,
    }
  },
}

export default SearchChartDateStyle
