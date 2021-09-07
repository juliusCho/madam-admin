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
  chart: `
    flex
    flex-col
    justify-center
    items-center
  `,
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
    mt-14
  `,
}

export default PageDashboardAppUseStyle
