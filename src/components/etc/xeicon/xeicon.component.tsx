import React from 'react'
import { TailwindColorPalette } from '~/types'
import * as helpers from '~/utils/helpers'

export interface XEIconProps {
  name: string
  size?: number | string
  color?: TailwindColorPalette | string // eg) mono.black, main.red, ...
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  disabled?: boolean
  testID?: string
}

function XEIcon({
  name,
  size,
  color,
  style,
  className,
  onClick,
  disabled,
  testID,
}: XEIconProps) {
  const colorClass = React.useMemo(() => {
    if (color) {
      if (color.includes('-')) {
        return helpers.convertColorToTailwind(
          'text',
          color ?? 'mono.black',
          !onClick,
        )
      }
      return color
    }

    return ''
  }, [color, helpers.convertColorToTailwind, onClick])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()

        if (!disabled && onClick) {
          onClick()
        }
      }}
      onKeyPress={(e) => {
        e.stopPropagation()

        if (!disabled && onClick) {
          onClick()
        }
      }}
      className={`${className} flex justify-center items-center ${
        onClick ? 'pointer' : `cursor-${disabled ? 'not-allowed' : 'default'}`
      }`}>
      <i
        className={`xi-${name} ${colorClass}`}
        data-testid={testID}
        style={{
          ...style,
          fontSize: size,
          fontFamily: 'xeicon',
          color: color?.includes('.') ? undefined : color,
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
