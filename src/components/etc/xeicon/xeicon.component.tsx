import React from 'react'
import helpers from '../../../utils/helpers'

export interface XEIconProps {
  name: string
  size?: number | string
  color?: string // eg) mono.black, main.red, ...
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  testID?: string
}

function XEIcon({
  name,
  size,
  color,
  style,
  className,
  onClick,
  testID,
}: XEIconProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()

        if (onClick) {
          onClick()
        }
      }}
      onKeyPress={(e) => {
        e.stopPropagation()

        if (onClick) {
          onClick()
        }
      }}
      className={`${className} flex justify-center items-center ${
        onClick ? '' : 'cursor-default'
      }`}>
      <i
        className={`xi-${name} ${helpers.convertColorToTailwind(
          'text',
          color,
          !onClick,
        )}`}
        data-testid={testID}
        style={{
          ...style,
          fontSize: size,
        }}
      />
    </div>
  )
}

XEIcon.defaultProps = {
  style: {},
  className: '',
  size: undefined,
  color: 'mono-black',
  onClick: undefined,
  testID: '',
}

export default React.memo(XEIcon)
