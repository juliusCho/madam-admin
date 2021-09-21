interface StyleProps {
  show: boolean
  device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen'
}

const ButtonToTopStyle = {
  button({ show, device }: StyleProps) {
    return !show
      ? 'fade-out-half'
      : `
      fade-in-half
      z-40
      flex
      flex-col
      justify-center
      items-center
      fixed
      bottom-10
      right-10
      rounded-lg
      opacity-80
      bg-sub-darkPurple
      hover:bg-sub-darkPurpleHover
      active:bg-sub-darkPurpleActive
      shadow-xl
      ${device === 'mobile' || device === 'smallScreen' ? 'p-2' : 'p-4'}
    `
  },
  label: `
    mt-1
    text-subMedium
    font-subMedium
    text-mono-white
  `,
}

export default ButtonToTopStyle
