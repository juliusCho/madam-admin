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
      mb-10
      ${isMobile ? 'border-b border-solid border-mono-gray' : ''}
    `
  },
  chartLabel({ isMobile }: StyleProps) {
    return isMobile
      ? 'text-titleBig font-titleBig text-mono-black'
      : 'text-titleMassive font-titleMassive text-mono-black'
  },
}

export default ChartLineStyle
