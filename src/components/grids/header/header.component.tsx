import React from 'react'
import { BorderCSS, TailwindColorPalette, TailwindFontSize } from '~/types'
import GridHeaderStyle from './header.style'

export interface GridHeaderProps {
  children?: string
  sort?: 'asc' | 'desc'
  sortable?: boolean
  onClick?: () => void
  checked?: boolean
  width?: string | number
  backgroundColor?: TailwindColorPalette
  fontColor?: TailwindColorPalette
  fontSize?: TailwindFontSize
  borderCSS?: BorderCSS
  style?: React.CSSProperties
  className?: string
}

function GridHeader({
  children,
  sort,
  sortable,
  onClick,
  checked,
  width,
  backgroundColor,
  fontColor,
  fontSize,
  borderCSS,
  style,
  className,
}: GridHeaderProps) {
  return (
    <button
      type="button"
      disabled={!onClick || !sortable}
      {...GridHeaderStyle.container({
        backgroundColor,
        borderCSS,
        width,
        oneItemExists: !children || !sort,
        clickable: !!onClick,
        style,
        className,
        fontSize,
        fontColor,
      })}
      onClick={onClick}
      data-testid="components.grids.header.container">
      {!!children && !!sort && <span />}
      {children ?? (
        <i
          {...GridHeaderStyle.checkbox({ fontSize, fontColor, checked })}
          data-testid="components.grids.header.checkbox"
        />
      )}
      {!!children && !!sort && (
        <i
          {...GridHeaderStyle.sort({ fontSize, type: sort })}
          data-testid="components.grids.header.sort-arrow"
        />
      )}
    </button>
  )
}

GridHeader.defaultProps = {
  children: undefined,
  sort: undefined,
  sortable: false,
  onClick: undefined,
  checked: false,
  width: '4rem',
  backgroundColor: 'mono-lightGray',
  fontColor: 'mono-black',
  fontSize: 'textBig',
  borderCSS: {
    borderStyle: 'solid',
    borderBold: false,
    borderRadius: undefined,
    borderColor: 'mono-black',
  },
  style: undefined,
  className: undefined,
}

export default React.memo(GridHeader)
