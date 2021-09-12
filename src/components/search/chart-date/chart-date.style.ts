const SearchChartDateStyle = {
  container: `
    flex
    justify-between
    items-center
    w-full
    px-4
    pb-4
  `,
  calendarCaller: `
    ml-10
    p-2
    rounded-full
    border-2
    border-solid
    border-mono-paleBlack
    hover:border-mono-paleBlackHover
    active:border-mono-paleBlackActive
  `,
  dividerClassName: `
    bg-transparent
    mx-2
  `,
  prevNextClassName: `
    border-2
    border-solid
    rounded-full
    border-mono-paleBlack
    hover:border-mono-paleBlackHover
    active:border-mono-paleBlackActive
    text-subTitleBig
    font-subTitleBig
    text-mono-paleBlack
    hover:text-mono-paleBlackHover
    active:text-mono-paleBlackActive
  `,
  prevNextDisabledClassName: `
    bg-transparent
    text-subTitleBig
    font-subTitleBig
    text-mono-lightGray
  `,
  icon(name: string) {
    return {
      name,
      color:
        'text-mono-black hover:text-mono-blackHover active:text-mono-blackActive',
      size: '2rem',
    }
  },
}

export default SearchChartDateStyle
