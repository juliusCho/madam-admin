interface StyleProps {
  isMobile: boolean
}

const ChartLineStyle = {
  chart({ isMobile }: StyleProps) {
    return `
      relative
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
  chartDate: `
    flex
    justify-center
    items-center
    mt-6
    w-82
  `,
}

export default ChartLineStyle
