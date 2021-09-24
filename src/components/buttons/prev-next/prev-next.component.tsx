import React from 'react'
import { XEIcon } from '../../etc/xeicon'
import ButtonPrevNextStyle from './prev-next.style'

export interface ButtonPrevNextProps {
  prev: {
    onClick: () => void
    label?: string
    disabled?: boolean
    icon?: {
      name: string
      color: string
      size: string | number
    }
    backgroundColor?: string
    disabledBackgroundColor?: string
    fontSize?: string
    borderColor?: string
    disabledBorderColor?: string
    color?: string
    disabledColor?: string
    extraClassName?: string
  }
  next: {
    onClick: () => void
    label?: string
    disabled?: boolean
    icon?: {
      name: string
      color: string
      size: string | number
    }
    backgroundColor?: string
    disabledBackgroundColor?: string
    fontSize?: string
    borderColor?: string
    disabledBorderColor?: string
    color?: string
    disabledColor?: string
    extraClassName?: string
  }
  dividerClassName?: string
  style?: React.CSSProperties
  className?: string
}

function ButtonPrevNext({
  prev,
  next,
  dividerClassName,
  style,
  className,
}: ButtonPrevNextProps) {
  return (
    <div
      className={`${ButtonPrevNextStyle.container} ${className}`}
      style={style}>
      <button
        type="button"
        className={ButtonPrevNextStyle.prevNext({
          disabled: prev.disabled,
          backgroundColor: prev.backgroundColor,
          disabledBackgroundColor: prev.disabledBackgroundColor,
          fontSize: prev.fontSize,
          borderColor: prev.borderColor,
          disabledBorderColor: prev.disabledBorderColor,
          color: prev.color,
          disabledColor: prev.disabledColor,
          extraClassName: prev.extraClassName,
        })}
        disabled={prev.disabled}
        onClick={prev.onClick}
        data-testid="components.buttons.prevNext.prevButton">
        {prev.icon && (
          <XEIcon
            onClick={prev.disabled ? undefined : prev.onClick}
            {...prev.icon}
          />
        )}
        {prev.label}
      </button>
      <div className={`${ButtonPrevNextStyle.divider} ${dividerClassName}`} />
      <button
        type="button"
        className={ButtonPrevNextStyle.prevNext({
          disabled: next.disabled,
          backgroundColor: next.backgroundColor,
          disabledBackgroundColor: next.disabledBackgroundColor,
          fontSize: next.fontSize,
          borderColor: next.borderColor,
          disabledBorderColor: next.disabledBorderColor,
          color: next.color,
          disabledColor: next.disabledColor,
          extraClassName: next.extraClassName,
        })}
        disabled={next.disabled}
        onClick={next.onClick}
        data-testid="components.buttons.prevNext.nextButton">
        {next.icon && (
          <XEIcon
            onClick={next.disabled ? undefined : next.onClick}
            {...next.icon}
          />
        )}
        {next.label}
      </button>
    </div>
  )
}

ButtonPrevNext.defaultProps = {
  dividerClassName: `bg-mono-black`,
  style: {},
  className: undefined,
}

export default React.memo(ButtonPrevNext)
