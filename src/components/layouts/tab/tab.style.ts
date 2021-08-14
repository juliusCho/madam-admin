import helpers from '../../../utils/helpers'

interface StyleProps {
  fontSize?: string
  selectedColor?: string
  selectedTextColor?: string
}

interface ListStyleProps {
  backgroundColor?: string
}

const tabStyle = `
  p-3
  mx-1
  border-mono-darkGray
  border-t
  border-l
  border-r
  rounded-t-lg
  shadow-lg
`

const LayoutTabStyle = {
  container({ backgroundColor }: ListStyleProps) {
    return `
      w-screen
      ${helpers.convertColorToTailwind('bg', backgroundColor, true)}
    `
  },
  tabList: `
    flex
    justify-center
    items-center
    border-dotted
    border-b
    border-mono-darkGray
    rounded-md
  `,
  unselectedTabTitle({ fontSize }: StyleProps) {
    return `
      ${tabStyle}
      bg-mono-gray
      text-mono-darkGray
      cursor-pointer
      shadow-inner
      ${helpers.convertTextToTailwind(fontSize)}
    `
  },
  selectedTabTitle({ fontSize, selectedColor, selectedTextColor }: StyleProps) {
    return `
      ${tabStyle}
      cursor-default
      ${helpers.convertTextToTailwind(fontSize)}
      ${helpers.convertColorToTailwind('bg', selectedColor, false)}
      ${helpers.convertColorToTailwind('text', selectedTextColor, false)}
    `
  },
  tabPanel({ selectedColor }: StyleProps) {
    return `
      h-4
      ${helpers.convertColorToTailwind('bg', selectedColor, false)}
    `
  },
}

export default LayoutTabStyle
