import React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import ButtonPrevNextStyle from './prev-next.style'

export type PrevNextType = {
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

export interface ButtonPrevNextProps {
  prev: PrevNextType
  next: PrevNextType
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
        className={ButtonPrevNextStyle.prevNext(prev)}
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
        className={ButtonPrevNextStyle.prevNext(next)}
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
