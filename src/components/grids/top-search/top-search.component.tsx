import React from 'react'
import { ButtonBasic } from '~/components/buttons/basic'
import {
  SearchGridSearchItem,
  SearchGridSearchItemProps,
} from '~/components/searches/grid-search-item'
import GridTopSearchStyle from './top-search.style'

export interface GridTopSearchProps {
  searchInputs: SearchGridSearchItemProps[]
  onSearch: () => void
  style?: React.CSSProperties
  className?: string
}

function GridTopSearch({
  searchInputs,
  onSearch,
  style,
  className,
}: GridTopSearchProps) {
  return (
    <div
      {...GridTopSearchStyle.container(style, className)}
      data-testid="components.grids.top-search.container">
      {searchInputs.map((searchInput, idx) => (
        <SearchGridSearchItem key={`${String(idx)}`} {...searchInput} />
      ))}
      <ButtonBasic
        onClick={onSearch}
        {...GridTopSearchStyle.button(
          searchInputs.map((searchInput) => searchInput.width ?? '0rem'),
        )}>
        검색
      </ButtonBasic>
    </div>
  )
}

GridTopSearch.defaultProps = {
  style: undefined,
  className: undefined,
}

export default React.memo(GridTopSearch)
