interface StyleProps {
  show: boolean
  device: 'mobile' | 'smallScreen' | 'mediumScreen' | 'screen'
}

const ButtonToTopStyle = {
  button({ show, device }: StyleProps) {
    return show
      ? 'fade-out-half'
      : `
      fade-in-half
      z-40
      fixed
      bottom-10
      right-10
      rounded-full
      bg-mono-white
      shadow-lg
      hover:bg-mono-whiteHover
      active:bg-mono-whiteActive
      border-solid
      border-mono-black
      hover:border-mono-blackHover
      active:border-mono-blackActive
      ${
        device === 'mobile' || device === 'smallScreen'
          ? 'border p-2'
          : 'border-2 p-4'
      }
    `
  },
}

export default ButtonToTopStyle
