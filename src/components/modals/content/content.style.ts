import helpers from '~/utils/helpers'

interface StyleProps {
  backgroundColor?: string
}

const ModalContentStyle = {
  container({ backgroundColor }: StyleProps) {
    return `
      fixed 
      top-0 
      left-0
      bg-opacity-50 
      z-max 
      w-full
      h-full
      flex 
      justify-center 
      items-center
      ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
    `
  },
  buttonArea: `
    w-full
    h-full
    flex
    justify-center
    items-center
    pt-4
    pb-8
  `,
  button: `
    mx-2
  `,
}

export default ModalContentStyle
