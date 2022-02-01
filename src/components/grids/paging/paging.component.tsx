import React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import { TailwindColorPalette, TailwindFontSize } from '~/types'
import GridPagingStyle from './paging.style'

export interface GridPagingProps {
  page: number
  totalPage: number
  onChange: (type: 'prev' | 'next') => void
  marginInBetween?: string | number
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  iconSize?: string | number
  iconColor?: TailwindColorPalette
  style?: React.CSSProperties
  className?: string
}

function GridPaging({
  page,
  totalPage,
  onChange,
  marginInBetween,
  fontSize,
  fontColor,
  iconSize,
  iconColor,
  style,
  className,
}: GridPagingProps) {
  return totalPage === 0 ? null : (
    <div {...GridPagingStyle.container({ style, className })}>
      {page > 1 ? (
        <XEIcon
          {...GridPagingStyle.arrow({ type: 'prev', iconSize, iconColor })}
          onClick={() => onChange('prev')}
          testID="components.grids.paging.prevBtn"
        />
      ) : (
        <div />
      )}
      <span
        {...GridPagingStyle.label({ fontSize, fontColor, marginInBetween })}>
        {`Page: ${page} / ${totalPage}`}
      </span>
      {page < totalPage ? (
        <XEIcon
          {...GridPagingStyle.arrow({ type: 'next', iconSize, iconColor })}
          onClick={() => onChange('next')}
          testID="components.grids.paging.nextBtn"
        />
      ) : (
        <div />
      )}
    </div>
  )
}

GridPaging.defaultProps = {
  marginInBetween: '1rem',
  fontSize: 'titleMedium',
  fontColor: 'mono-black',
  iconSize: '2rem',
  iconColor: 'mono-black',
  style: undefined,
  className: undefined,
}

export default React.memo(GridPaging)
