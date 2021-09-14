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
      border-mono-paleBlack
      hover:border-mono-paleBlackHover
      active:border-mono-paleBlackActive
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
      border-mono-paleBlack
      hover:border-mono-paleBlackHover
      active:border-mono-paleBlackActive
      text-mono-paleBlack
      hover:text-mono-paleBlackHover
      active:text-mono-paleBlackActive
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'border text-textBig font-textBig'
          : 'border-2 text-subTitleBig font-subTitleBig'
      }
    `
  },
  prevNextDisabledClassName({ device }: StyleProps) {
    return `
      bg-transparent
      text-mono-lightGray
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'text-textBig font-textBig'
          : 'text-subTitleBig font-subTitleBig'
      }
    `
  },
  icon(
    name: string,
    device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen',
    disabled?: boolean,
  ) {
    return {
      name,
      color: disabled
        ? 'text-mono-gray'
        : 'text-mono-black hover:text-mono-blackHover active:text-mono-blackActive',
      size:
        device === 'mobile' || device === 'smallScreen' ? '0.875rem' : '2rem',
      className: disabled ? 'cursor-not-allowed' : undefined,
    }
  },
}

export default SearchChartDateStyle
