import React from 'react'
import { XEIcon } from '../../etc/xeicon'
import ButtonPrevNextStyle from './prev-next.style'

export interface ButtonPrevNextProps {
  onClickPrev: () => void
  onClickNext: () => void
  prevDisabled: boolean
  nextDisabled: boolean
  prevIcon?: {
    name: string
    color: string
    size: string
  }
  nextIcon?: {
    name: string
    color: string
    size: string
  }
  prevLabel?: string
  nextLabel?: string
  prevClassName?: string
  nextClassName?: string
  prevDisabledClassName?: string
  nextDisabledClassName?: string
  dividerClassName?: string
  style?: React.CSSProperties
  className?: string
}

function ButtonPrevNext({
  onClickPrev,
  onClickNext,
  prevDisabled,
  nextDisabled,
  prevIcon,
  nextIcon,
  prevLabel,
  nextLabel,
  prevClassName,
  nextClassName,
  prevDisabledClassName,
  nextDisabledClassName,
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
        className={`${ButtonPrevNextStyle.prevNext} ${
          prevDisabled ? prevDisabledClassName : prevClassName
        } ${prevDisabled ? 'cursor-not-allowed' : ''}`}
        disabled={prevDisabled}
        onClick={onClickPrev}>
        {prevIcon && <XEIcon onClick={onClickPrev} {...prevIcon} />}
        {prevLabel}
      </button>
      <div className={`${ButtonPrevNextStyle.divider} ${dividerClassName}`} />
      <button
        type="button"
        className={`${ButtonPrevNextStyle.prevNext} ${
          nextDisabled ? nextDisabledClassName : nextClassName
        } ${nextDisabled ? 'cursor-not-allowed' : ''}`}
        disabled={nextDisabled}
        onClick={onClickNext}>
        {nextLabel}
        {nextIcon && <XEIcon onClick={onClickNext} {...nextIcon} />}
      </button>
    </div>
  )
}

ButtonPrevNext.defaultProps = {
  prevIcon: {
    name: 'angle-left',
    size: '0.875rem',
    color: 'mono.black',
  },
  nextIcon: {
    name: 'angle-right',
    size: '0.875rem',
    color: 'mono.black',
  },
  prevLabel: undefined,
  nextLabel: undefined,
  prevClassName: `
    bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive
    border border-solid border-mono-black hover:border-mono-blackHover active:border-mono-blackActive
    text-textBig font-textBig
    text-mono-black hover:text-mono-blackHover active:text-mono-blackActive
  `,
  nextClassName: `
    bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive
    border border-solid border-mono-black hover:border-mono-blackHover active:border-mono-blackActive
    text-textBig font-textBig
    text-mono-black hover:text-mono-blackHover active:text-mono-blackActive
  `,
  prevDisabledClassName: `
    bg-mono-lightGray
    border border-solid border-mono-darkGray
    text-textBig font-textBig
    text-mono-darkGray
  `,
  nextDisabledClassName: `
    bg-mono-lightGray
    border border-solid border-mono-darkGray
    text-textBig font-textBig
    text-mono-darkGray
  `,
  dividerClassName: `bg-mono-black`,
  style: {},
  className: undefined,
}

export default React.memo(ButtonPrevNext)
