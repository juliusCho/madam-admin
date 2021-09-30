import { ScreenOptionType } from '../../../types'

interface StyleProps {
  device: ScreenOptionType
}

const LayoutHeaderStyle = {
  container: `
    h-56
    sm:h-32
    py-4
    w-screen
    sm:flex
    justify-start
    justify-between
    items-center
    bg-mono-pale
  `,
  modalContent: `
    bg-mono-white
    rounded-lg
    shadow-2xl
    p-4
    w-100
    h-36
  `,
  buttonArea: `
    md:h-full
    sm:flex
    justify-end
    items-center
    mr-0
    sm:mr-4
    mt-4
    sm:mt-0
  `,
  button: `
    shadow-md
    h-8
    md:h-12
    sm:h-10
    m-2
    sm:m-0
    ml-4
    mt-4
    sm:mt-0
    text-subMedium
    font-subMedium
    md:text-textMedium
    md:font-textMedium
  `,
  welcome: `
    text-subMedium
    font-subMedium
    md:text-subTitleSmall
    md:font-subTitleSmall
    text-mono-paleBlack
    m-4
    sm:mt-1
    mr-0
    sm:mr-4
    mb-1
    sm:mb-0
  `,
  adminName: `
    text-textBig
    font-textBig
    md:text-subTitleBig
    md:font-subTitleBig
    text-sub-darkPurple
    mr-0
    sm:mr-8
    mb-2
    sm:mb-0
  `,
  madam({ device }: StyleProps) {
    return `
      cursor-pointer 
      hover:text-mono-blackHover 
      active:text-mono-blackActive
      titleMassive
      ${device === 'mobile' || device === 'smallScreen' ? 'ml-4' : 'ml-8'}
    `
  },
}

export default LayoutHeaderStyle
