import { ScreenOptionType } from '~/enums'

interface StyleProps {
  device: ScreenOptionType
}

const PageDashboardStyle = {
  container({ device }: StyleProps) {
    return `
      pt-4
      pb-10
      w-screen
      h-full
      flex
      flex-col
      justify-center
      items-center
      ${device === 'mobile' ? 'mt-5' : ''}
    `
  },
  row({ device }: StyleProps) {
    return `
      w-full
      relative
      flex
      flex-wrap
      justify-center
      items-center
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'flex-col mt-8'
          : 'flex-row'
      }
    `
  },
  chart({ device }: StyleProps) {
    return device === 'mobile' || device === 'smallScreen'
      ? 'mt-10'
      : 'mt-1 mx-4'
  },
}

export default PageDashboardStyle
