interface StyleProps {
  isMobile: boolean
}

const PageDashboardAppUseStyle = {
  container: `
    p-4
    w-screen
    h-full
    flex
    flex-col
    justify-center
    items-center
  `,
  row: `
    w-full
    relative
    flex
    flex-wrap
    justify-center
    items-center
  `,
  chart({ isMobile }: StyleProps) {
    return `
      flex
      flex-col
      justify-center
      items-center
      ${isMobile ? 'border-b border-solid border-mono-gray py-2' : ''}
    `
  },
  chartLabel({ isMobile }: StyleProps) {
    return isMobile
      ? 'text-titleBig font-titleBig text-mono-black'
      : 'text-titleMassive font-titleMassive text-mono-black'
  },
  pieChartLabel: `
    absolute
    flex
    flex-col
    justify-center
    items-center
    z-10
  `,
  chartDate: `
    flex
    justify-center
    items-center
    mt-6
    w-82
  `,
}

export default PageDashboardAppUseStyle
