import React from 'react'
import XEIcon from '~/components/etc/xeicon/xeicon.component'
import ButtonRoundWithIconStyle from './round-with-icon.style'

export interface ButtonRoundWithIconProps {
  children: string | React.ReactNode | Array<React.ReactNode>
  onClick: (id?: string) => void
  icon: string
  iconSize?: string | number
  id?: string
  active?: boolean
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  disabledChildren?: string | React.ReactNode | Array<React.ReactNode>
  colorIcon?: string
  colorIconActive?: string
  colorActive?: string // eg) mono.white, main.red, ...
  colorInactive?: string // eg) mono.white, main.red, ...
  colorDisabled?: string // eg) mono.white, main.red, ...
}

function ButtonRoundWithIcon({
  id,
  icon,
  iconSize,
  active,
  disabled,
  onClick,
  children,
  style,
  className,
  disabledChildren,
  colorIcon,
  colorIconActive,
  colorActive,
  colorInactive,
  colorDisabled,
}: ButtonRoundWithIconProps) {
  const onClickButton = () => {
    if (disabled) {
      return
    }

    onClick(id)
  }

  return (
    <button
      type="button"
      onClick={onClickButton}
      className={`${ButtonRoundWithIconStyle.container({
        active: !!active,
        disabled: !!disabled,
        colorDisabled,
        colorActive,
        colorInactive,
      })} ${className}`}
      style={style}>
      <XEIcon
        name={icon}
        color={
          active
            ? colorIconActive ?? 'mono-white'
            : colorIcon ?? 'mono-paleBlack'
        }
        size={iconSize}
        onClick={disabled ? undefined : onClickButton}
        className={ButtonRoundWithIconStyle.icon}
      />
      {disabled && disabledChildren ? disabledChildren : children}
    </button>
  )
}

ButtonRoundWithIcon.defaultProps = {
  id: undefined,
  style: {},
  className: '',
  iconSize: '1rem',
  active: false,
  disabled: false,
  disabledChildren: '',
  colorIcon: 'mono-paleBlack',
  colorIconActive: 'mono-white',
  colorActive: 'mono-white',
  colorInactive: 'mono-pale',
  colorDisabled: 'mono-lightGray',
}

export default React.memo(ButtonRoundWithIcon)
