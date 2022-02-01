import { CSSProperties } from 'react'
import {
  convertColorToTailwind,
  convertFontToTailwindClass,
} from '~/utils/helpers'

interface StyleProps {
  height?: string | number
}

interface ContainerStyle extends StyleProps {
  style?: CSSProperties
  className?: string
}

const GridBodyStyle = {
  container({ height, style, className }: ContainerStyle) {
    return {
      className: `
        relative
        w-full
        overflow-auto
        flex
        flex-col
        justify-start
        items-start
        border
        border-solid
        border-mono-gray
        ${className ?? ''}
      `,
      style: {
        height,
        ...style,
      },
    }
  },
  headerContainer: {
    className: `
      w-full
      sticky
      top-0
      z-10
      flex
      justify-start
      items-start
    `,
  },
  columnContainer: {
    className: `
      w-full
      z-0
      flex
      justify-start
      items-start
    `,
    style: {
      height: 'calc(100% - 3rem)',
    },
  },
  fixedArea(width?: string | number, isHeader?: boolean) {
    return {
      className: `
        sticky
        left-0
        z-10
        flex
        justify-start
        items-start
        ${isHeader ? '' : 'flex-col'}
      `,
      style: {
        width,
      },
    }
  },
  unfixedArea(width?: string | number, isHeader?: boolean) {
    return {
      className: `
        z-0
        flex
        justify-start
        items-start
        ${isHeader ? '' : 'flex-col'}
      `,
      style: {
        width,
      },
    }
  },
  row: {
    className: `
      w-full
      flex
      justify-start
      items-start
    `,
  },
  noData: {
    className: `
      w-full
      h-full
      flex
      justify-center
      items-center
      ${convertFontToTailwindClass('subTitleBig')}
      ${convertColorToTailwind('text', 'mono-gray', true)}
    `,
  },
}

export default GridBodyStyle
