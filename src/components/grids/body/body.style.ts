import { CSSProperties } from 'react'

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
        w-full
        overflow-auto
        flex
        flex-col
        justify-start
        items-start
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
  },
  fixedArea(width?: string | number) {
    return {
      className: `
        sticky
        left-0
        z-10
        flex
        flex-col
        justify-start
        items-start
      `,
      style: {
        width,
      },
    }
  },
  unfixedArea(width?: string | number) {
    return {
      className: `
        z-0
        flex
        flex-col
        justify-start
        items-start
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
}

export default GridBodyStyle
