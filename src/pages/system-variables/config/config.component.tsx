import React from 'react'
import api from '~/apis/system-variables'
import { SearchGridSearchItem } from '~/components/searches/grid-search-item'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'
import PageSystemVariableStyle from '../layout.style'

export interface PageSystemVariableConfigProps {}

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  const [searchInput, setSearchInput] = React.useState<{
    type?: string | null
    use?: boolean | null
    page: number
    pageCount: number
  }>({ page: 1, pageCount: 10 })
  const [options, setOptions] = React.useState<
    Array<{ label: string; value: string }>
  >([])

  React.useLayoutEffect(() => {
    const subscription = api.apiGetAllSystemVariableTypes$().subscribe({
      next: (value) =>
        setOptions(value.map((val) => ({ label: val, value: val }))),
      error: () => setOptions([]),
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <PageSystemVariableLayout endpoint="CONFIG">
      <div {...PageSystemVariableStyle.layout}>
        <div {...PageSystemVariableStyle.selectContainer}>
          <SearchGridSearchItem
            type="single-select"
            label="유형"
            onSelect={(value) =>
              setSearchInput((old) => ({
                ...old,
                type: value as null | undefined | string,
              }))
            }
            options={options}
            value={searchInput.type}
            placeholder="전체"
            width="10rem"
            contentHeight="3rem"
          />
        </div>
      </div>
    </PageSystemVariableLayout>
  )
}
