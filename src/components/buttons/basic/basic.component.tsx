import React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import {
  BorderRadius,
  BorderStyle,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import ButtonBasicStyle from './basic.style'

export interface ButtonBasicProps {
  children: string
  onClick: () => void
  disabled?: boolean
  padding?: number
  buttonWidth?: string | number
  buttonHeight?: string | number
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  backgroundColor?: TailwindColorPalette
  borderStyle?: BorderStyle
  borderBold?: boolean
  borderRadius?: BorderRadius
  borderColor?: TailwindColorPalette
  icon?: {
    isRight?: boolean
    name: string
    padding?: number
    color?: TailwindColorPalette
    borderStyle?: BorderStyle
    borderBold?: boolean
    borderRadius?: BorderRadius
    borderColor?: TailwindColorPalette
    backgroundColor?: TailwindColorPalette
  }
  style?: React.CSSProperties
  className?: string
}

function ButtonBasic({
  children,
  onClick,
  disabled,
  buttonHeight,
  buttonWidth,
  fontSize,
  padding,
  backgroundColor,
  fontColor,
  borderStyle,
  borderBold,
  borderRadius,
  borderColor,
  icon,
  style,
  className,
}: ButtonBasicProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, width: buttonWidth, height: buttonHeight }}
      className={`${ButtonBasicStyle.button({
        disabled,
        padding,
        backgroundColor,
        borderStyle,
        borderBold,
        borderRadius,
        borderColor,
      })} ${className}`}
      data-testid="components.buttons.basic.button">
      {icon && !icon.isRight && (
        <XEIcon
          {...ButtonBasicStyle.icon({
            icon: icon.name,
            padding: icon.padding,
            backgroundColor: icon.backgroundColor,
            borderStyle: icon.borderStyle,
            borderBold: icon.borderBold,
            borderRadius: icon.borderRadius,
            borderColor: icon.borderColor,
            color: icon.color,
            fontSize,
          })}
          onClick={onClick}
          testID="components.buttons.basic.icon"
        />
      )}
      <p
        className={ButtonBasicStyle.text({
          disabled,
          fontSize,
          color: fontColor,
        })}
        data-testid="components.buttons.basic.text">
        {children}
      </p>
      {icon && icon.isRight && (
        <XEIcon
          {...ButtonBasicStyle.icon({
            disabled,
            icon: icon.name,
            padding: icon.padding,
            backgroundColor: icon.backgroundColor,
            borderStyle: icon.borderStyle,
            borderBold: icon.borderBold,
            borderRadius: icon.borderRadius,
            borderColor: icon.borderColor,
            color: icon.color,
            fontSize,
          })}
          onClick={onClick}
          testID="components.buttons.basic.icon"
        />
      )}
    </button>
  )
}

ButtonBasic.defaultProps = {
  disabled: false,
  padding: 4,
  buttonWidth: '5rem',
  buttonHeight: '4.7rem',
  fontSize: 'textMedium',
  fontColor: 'mono-black',
  backgroundColor: 'mono-white',
  borderStyle: undefined,
  borderBold: false,
  borderRadius: undefined,
  borderColor: undefined,
  icon: undefined,
  style: undefined,
  className: undefined,
}

export default React.memo(ButtonBasic)
