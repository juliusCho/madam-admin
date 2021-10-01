import { ScreenOptionType } from '~/types'
import helpers from '~/utils/helpers'

interface StyleProps {
  show: boolean
  device: ScreenOptionType
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
      ${helpers.convertColorToTailwind('bg', 'sub-darkPurple')}
      shadow-xl
      ${device === 'mobile' || device === 'smallScreen' ? 'p-2' : 'p-4'}
    `
  },
  label: `
    mt-1
    ${helpers.convertTextToTailwind('subMedium')}
    ${helpers.convertColorToTailwind('text', 'mono-white')}
  `,
}

export default ButtonToTopStyle
