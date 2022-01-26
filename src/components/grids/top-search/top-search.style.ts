import { CSSProperties } from 'react'
import { TailwindColorPalette } from '~/types'

const GridTopSearchStyle = {
  container(style?: CSSProperties, className?: string) {
    return {
      className: `
        w-full
        flex
        justify-between
        items-center
        ${className ?? ''}
      `,
      style,
    }
  },
  button(inputWidths: Array<string | number>) {
    return {
      backgroundColor: 'main-navy' as TailwindColorPalette,
      fontColor: 'mono-white' as TailwindColorPalette,
      icon: {
        isRight: true,
        name: 'search',
        color: 'mono-white' as TailwindColorPalette,
      },
      buttonHeight: '4.7rem',
      buttonWidth: `calc(100% - ${inputWidths.join(' - 1px - ')})`,
    }
  },
}

export default GridTopSearchStyle
