import React from 'react'
import ButtonCircleStyle from './circle.style'

export interface ButtonCircleProps {
  children: string
  onClick: () => void
  buttonSize?: number
  fontSize?: string
  padding?: number
  borderWidth?: number
  borderColor?: string
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
  borderColor,
  backgroundColor,
  color,
  style,
  className,
}: ButtonCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`${ButtonCircleStyle.button({
        buttonSize,
        borderWidth,
        borderColor,
        backgroundColor,
        padding,
      })} ${className}`}
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
  buttonSize: 20,
  fontSize: 'textMedium',
  padding: 4,
  borderWidth: undefined,
  borderColor: 'mono.black',
  backgroundColor: 'mono.white',
  color: 'mono.black',
  style: undefined,
  className: undefined,
}

export default React.memo(ButtonCircle)
