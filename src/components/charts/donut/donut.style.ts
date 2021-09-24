interface StyleProps {
  isMobile: boolean
}

interface CenterTextStyleProps {
  isSmallScreen: boolean
  bold?: boolean
}

const ChartDonutStyle = {
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
  centerTextContainer({ isMobile }: StyleProps) {
    return `
      absolute
      flex
      flex-col
      justify-center
      items-center
      z-10
      ${isMobile ? 'mt-8' : 'mt-16'}
    `
  },
  centerText({ isSmallScreen, bold }: CenterTextStyleProps) {
    return isSmallScreen
      ? `${
          bold
            ? 'text-subMedium font-subMedium text-mono-black'
            : 'text-subSmall font-subSmall text-mono-darkGray'
        }`
      : `${
          bold
            ? 'text-subTitleBig font-subTitleBig text-mono-black'
            : 'text-subTitleMedium font-subTitleMedium text-mono-darkGray'
        }`
  },
}

export default ChartDonutStyle
