interface StyleProps {
  device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen'
}

const PageDashboardAppUseStyle = {
  container({ device }: StyleProps) {
    return `
      py-4
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
  lineChart({ device }: StyleProps) {
    return device === 'mobile' || device === 'smallScreen' ? 'mt-8' : 'mt-1'
  },
}

export default PageDashboardAppUseStyle
