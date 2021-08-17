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
  border-t-2
  border-l-2
  border-r-2
  border-mono-gray
  rounded-t-lg
  relative
`

const LayoutTabStyle = {
  container({ backgroundColor }: ListStyleProps) {
    return `
      w-screen
      ${helpers.convertColorToTailwind(backgroundColor || '', true)}
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
      lg:text-${fontSize}
      lg:font-${fontSize}
      md:text-${fontSize}
      md:font-${fontSize}
      sm:text-subMedium
      sm:font-subMedium
      bg-mono-pale
      hover:bg-mono-paleHover
      active:bg-mono-paleActive
      text-mono-gray
      hover:text-mono-grayHover
      active:text-mono-grayActive
    `
  },
  selectedTabTitle({ fontSize, selectedColor, selectedTextColor }: StyleProps) {
    return `
      ${tabStyle}
      lg:text-${fontSize}
      lg:font-${fontSize}
      md:text-${fontSize}
      md:font-${fontSize}
      sm:text-subMedium
      sm:font-subMedium
      ${helpers.convertColorToTailwind(selectedColor, true)}
      ${helpers.convertColorToTailwind(selectedTextColor, true)}
    `
  },
  selectedTabUnderline({ selectedColor }: StyleProps) {
    return `
      absolute
      left-0
      h-1
      w-full
      ${helpers.convertColorToTailwind(selectedColor, true)}
    `
  },
  tabPanel({ selectedColor }: StyleProps) {
    return `
      pt-4
      w-full
      h-screen
      ${helpers.convertColorToTailwind(selectedColor, true)}
    `
  },
}

export default LayoutTabStyle
