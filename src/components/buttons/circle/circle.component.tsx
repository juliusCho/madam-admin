import React from 'react'
import ButtonCircleStyle from './circle.style'

export interface ButtonCircleProps {
  children: string
  onClick: () => void
  buttonSize?: string
  fontSize?: string
  padding?: number
  borderWidth?: string
  backgroundColor?: string
  color?: string
  style?: React.CSSProperties
  className?: string
}

function ButtonCircle({
  children,
  onClick,
  buttonSize,
  fontSize,
  padding,
  borderWidth,
  backgroundColor,
  color,
  style,
  className,
}: ButtonCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style, width: buttonSize, height: buttonSize }}
      className={`${ButtonCircleStyle.button({
        padding,
        backgroundColor,
      })} ${className} ${borderWidth}`}
      data-testid="components.buttons.circle.button">
      <p
        className={ButtonCircleStyle.text({
          fontSize,
          color,
        })}
        data-testid="components.buttons.circle.text">
        {children}
      </p>
    </button>
  )
}

ButtonCircle.defaultProps = {
  buttonSize: '5rem',
  fontSize: 'textMedium',
  padding: 4,
  borderWidth: 'border',
  backgroundColor: 'mono-white',
  color: 'mono-black',
  style: undefined,
  className: undefined,
}

export default React.memo(ButtonCircle)
