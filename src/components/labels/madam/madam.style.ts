import { TailwindFontSize } from '~/types'
import helpers from '~/utils/helpers'

interface StyleProps {
  size?: TailwindFontSize
}

const LabelMadamStyle = {
  text({ size }: StyleProps) {
    return `
      ${helpers.convertFontToTailwindClass(size)}
      font-titleBig
    `
  },
}

export default LabelMadamStyle
