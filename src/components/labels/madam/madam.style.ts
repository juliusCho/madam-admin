import helpers from '../../../utils/helpers'

interface StyleProps {
  size?: string
}

const LabelMadamStyle = {
  text({ size }: StyleProps) {
    return `
      ${helpers.convertTextToTailwind(size)}
      font-titleBig
    `
  },
}

export default LabelMadamStyle
