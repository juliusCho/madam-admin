import { ScreenOptionType, TailwindColorPalette } from '~/types'

interface StyleProps {
  isMobile: boolean
}

interface DeviceStyleProps {
  device: ScreenOptionType
}

const ChartLineByDatasetStyle = {
  loader: `rounded-full`,
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
  selectContainer: `
    w-full
    flex
    justify-between
    items-center
  `,
  comboBoxContainer: `
    flex
    justify-start
    items-center
    ml-5
    mb-2
  `,
  comboBoxLabel({ device }: DeviceStyleProps) {
    return `
      text-mono-paleBlack
      mr-3
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'text-textMedium font-textMedium'
          : 'text-subTitleMedium font-subTitleMedium'
      }
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
      color: (disabled ? 'mono-gray' : color) as TailwindColorPalette,
      size:
        device === 'mobile' || device === 'smallScreen' ? '0.75rem' : '2rem',
    }
  },
  prevNextClassName({ device }: DeviceStyleProps) {
    return `
      border-solid
      rounded-full
      ${device === 'mobile' || device === 'smallScreen' ? 'border' : 'border-2'}
    `
  },
  dividerClassName: `
    bg-transparent
    mx-2
  `,
}

export default ChartLineByDatasetStyle
