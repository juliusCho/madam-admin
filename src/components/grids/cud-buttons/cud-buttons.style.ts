import { CSSProperties } from 'react'
import { BorderRadius, BorderStyle, TailwindColorPalette } from '~/types'

interface StyleProps {
  style?: CSSProperties
  className?: string
}

interface ButtonStyle extends StyleProps {
  borderStyle?: BorderStyle
  borderBold?: boolean
  borderRadius?: BorderRadius
  borderColor?: TailwindColorPalette
  icon: string
  color: TailwindColorPalette
}

const GridCudButtonsStyle = {
  container({ style, className }: StyleProps) {
    return {
      className: `
        flex
        justify-between
        items-center
        w-full
        ${className ?? ''}
      `,
      style,
    }
  },
  leftContainer: {
    className: `
      flex
      justify-start
      items-center
      h-full
      w-1/2
    `,
  },
  button({
    borderStyle,
    borderBold,
    borderRadius,
    borderColor,
    icon,
    color,
    className,
  }: ButtonStyle) {
    return {
      buttonHeight: '3rem',
      buttonWidth: '7rem',
      backgroundColor: color,
      borderStyle,
      borderBold,
      borderRadius,
      borderColor,
      icon: {
        isRight: true,
        name: icon,
        color: 'mono-black' as TailwindColorPalette,
      },
      className,
    }
  },
}

export default GridCudButtonsStyle
