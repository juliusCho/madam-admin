import React from 'react'
import { TailwindFontSize } from '~/types'
import LabelMadamStyle from './madam.style'

export interface LabelMadamProps {
  size?: TailwindFontSize
  style?: React.CSSProperties
  className?: string
}

function LabelMadam({ size, style, className }: LabelMadamProps) {
  return (
    <span
      className={`${LabelMadamStyle.text({ size })} ${className}`}
      style={style}
      data-testid="components.labels.madam.text">
      Madam
    </span>
  )
}

LabelMadam.defaultProps = {
  size: 'titleBig',
  style: undefined,
  className: undefined,
}

export default React.memo(LabelMadam)
