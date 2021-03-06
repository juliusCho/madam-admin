import * as helpers from '~/utils/helpers'

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
  mx-0
  sm:mx-1
  h-12
  border-t-2
  border-l-2
  border-r-2
  border-mono-gray
  rounded-t-lg
  relative
  break-words
  whitespace-pre
  text-subMedium
  font-subMedium
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
    border-b-2
    border-solid
    border-mono-gray
    list-none
  `,
  unselectedTabTitle({ fontSize }: StyleProps) {
    return `
      ${tabStyle}
      cursor-pointer
      shadow-2xl
      shadow-inner
      ${fontSize}
      ${helpers.convertColorToTailwind('bg', 'mono-lightGray')}
      ${helpers.convertColorToTailwind('text', 'mono-gray')}
    `
  },
  selectedTabTitle({ fontSize, selectedColor, selectedTextColor }: StyleProps) {
    return `
      ${tabStyle}
      ${fontSize}
      ${helpers.convertColorToTailwind('bg', selectedColor, true)}
      ${helpers.convertColorToTailwind('text', selectedTextColor, true)}
    `
  },
  selectedTabUnderline({ selectedColor }: StyleProps) {
    return `
      absolute
      left-0
      h-1
      w-full
      ${helpers.convertColorToTailwind('bg', selectedColor, true)}
    `
  },
  tabPanel({ selectedColor }: StyleProps) {
    return `
      pt-4
      w-full
      ${helpers.convertColorToTailwind('bg', selectedColor, true)}
    `
  },
}

export default LayoutTabStyle
