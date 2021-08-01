import React from 'react'
import ButtonCircleStyle from './circle.style'

export interface ButtonCircleProps {
  children: string
  onClick: () => void
  fontSize?: string
  padding?: number
  borderColor?: string
  backgroundColor?: string
  color?: string
}

function ButtonCircle({
  children,
  onClick,
  fontSize,
  padding,
  borderColor,
  backgroundColor,
  color,
}: ButtonCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={ButtonCircleStyle.button({
        borderColor,
        backgroundColor,
        padding,
      })}>
      <p
        className={ButtonCircleStyle.text({
          fontSize,
          color,
        })}>
        {children}
      </p>
    </button>
  )
}

ButtonCircle.defaultProps = {
  fontSize: 'text.medium',
  padding: 1,
  borderColor: 'mono.black',
  backgroundColor: 'mono.white',
  color: 'mono.black',
}

export default React.memo(ButtonCircle)
