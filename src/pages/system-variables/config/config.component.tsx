import { startAfter } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import api from '~/apis/system-variables'
import { GridBody } from '~/components/grids/body'
import { GridCudButtons } from '~/components/grids/cud-buttons'
import { GridTopSearch } from '~/components/grids/top-search'
import {
  SystemVariableFilterType,
  SystemVariableType,
} from '~/models/system-variable'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'
import { WhereFilterType } from '~/types/firestore'
import PageSystemVariableStyle from '../layout.style'

export interface PageSystemVariableConfigProps {}

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  const [searchInput, setSearchInput] = React.useState<{
    type?: string | null
    use?: boolean | null
    page: number
    pageCount?: number | null
  }>({ page: 1, pageCount: 10 })
  const [options, setOptions] = React.useState<
    Array<{ label: string; value: string }>
  >([])
  const [list, setList] = React.useState<SystemVariableType[]>([])

  React.useLayoutEffect(() => {
    const subscription = api.apiGetAllSystemVariableTypes$().subscribe({
      next: (value) =>
        setOptions(value.map((val) => ({ label: val, value: val }))),
      error: () => setOptions([]),
    })

    return () => subscription.unsubscribe()
  }, [])

  const pageCount = React.useMemo(() => {
    const pages = Math.floor(list.length / (searchInput.pageCount ?? 999999))
    const leftOversExist = list.length - pages > 0

    return pages + (leftOversExist ? 1 : 0)
  }, [list, searchInput.pageCount])

  const pageList = React.useMemo(() => {
    const { page, pageCount: pageCnt } = searchInput
    let offset = (page - 1) * (pageCnt ?? list.length)

    const items: SystemVariableType[] = []

    for (offset; offset < page * (pageCnt ?? list.length); offset += 1) {
      if (offset === list.length) {
        break
      }
      items.push(list[offset])
    }

    return items
  }, [list, searchInput.page, searchInput.pageCount])

  const onSearch = React.useCallback(
    async (sort?: {
      column: keyof SystemVariableType
      type: 'asc' | 'desc'
    }) => {
      const filter: WhereFilterType<SystemVariableFilterType>[] = []

      if (typeof searchInput.type === 'string') {
        filter.push(['type', '==', searchInput.type])
      }

      if (typeof searchInput.use === 'boolean') {
        filter.push(['use', '==', searchInput.use])
      }

      const result = await api.apiGetSystemVariables({
        limit: searchInput.pageCount ?? 10000,
        offset: startAfter(moment('9999-12-31').toDate()),
        sort: sort ?? {
          column: 'modifiedAt',
          type: 'desc',
        },
        filter,
      })

      setSearchInput((old) => ({ ...old, page: 1 }))

      setList(() => result)
    },
    [],
  )

  React.useEffect(() => {
    onSearch()
  }, [])

  const onSave = () => {}

  const onCancel = () => {}

  const onAdd = () => {}

  const onDelete = () => {}

  console.log('list', pageList)
  console.log('list', pageCount)

  return (
    <PageSystemVariableLayout endpoint="CONFIG">
      <div {...PageSystemVariableStyle.layout}>
        <GridTopSearch
          onSearch={() => onSearch()}
          searchInputs={[
            {
              type: 'single-select',
              label: '유형',
              onSelect: (value) =>
                setSearchInput((old) => ({
                  ...old,
                  type: value as null | undefined | string,
                })),
              options,
              value: searchInput.type,
              placeholder: '전체',
              width: '20rem',
            },
            {
              type: 'radio',
              label: '사용여부',
              onSelect: (value) =>
                setSearchInput((old) => ({
                  ...old,
                  use: value as null | undefined | boolean,
                })),
              options: [
                { label: '사용', value: true },
                { label: '미사용', value: false },
              ],
              value: searchInput.use,
              placeholder: '전체',
              width: '15rem',
            },
            {
              type: 'single-select',
              label: '페이지당 표출 개수',
              onSelect: (value) =>
                setSearchInput((old) => ({
                  ...old,
                  pageCount: value as null | undefined | number,
                })),
              options: [
                { label: '10', value: 10 },
                { label: '100', value: 100 },
                { label: '1000', value: 1000 },
                { label: '10000', value: 10000 },
              ],
              value: searchInput.pageCount,
              placeholder: '전체',
              width: '10rem',
            },
          ]}
        />
        <GridCudButtons
          onSave={onSave}
          onCancel={onCancel}
          onAdd={onAdd}
          onDelete={onDelete}
          className="mt-10 mb-2"
        />
        <GridBody
          onCheck={(idx: number, newState: boolean) => {
            console.log(
              '🚀 ~ file: config.component.tsx ~ line 177 ~ PageSystemVariableConfig ~ idx',
              idx,
            )
            console.log(
              '🚀 ~ file: config.component.tsx ~ line 178 ~ PageSystemVariableConfig ~ newState',
              newState,
            )
          }}
          onCheckAll={() => {
            console.log('onCheckAll')
          }}
          properties={[
            {
              key: 'type',
              type: 'single-select',
              label: '유형',
              options: [
                { value: 'POINT', label: '포인트 설정' },
                { value: 'SYSTEM', label: '시스템 설정' },
              ],
              onChange: (input: string) => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 191 ~ PageSystemVariableConfig ~ input',
                  input,
                )
              },
              width: '8rem',
              justify: 'center',
            },
            {
              key: 'name',
              type: 'text',
              label: '변수명',
              onChange: (input: string) => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 201 ~ PageSystemVariableConfig ~ input',
                  input,
                )
              },
              width: '8rem',
              justify: 'start',
            },
            {
              key: 'createdAt',
              type: 'date',
              label: '생성일시',
              onChange: (input: Date) => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 219 ~ PageSystemVariableConfig ~ input',
                  input,
                )
              },
              format: 'YYYY-MM-DD',
              nullable: true,
              onSort: (sort?: 'asc' | 'desc') => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 237 ~ PageSystemVariableConfig ~ sort',
                  sort,
                )
              },
              sort: 'asc',
              width: '8rem',
              justify: 'center',
            },
          ]}
          data={[
            {
              checked: true,
              crud: 'r',
              no: 1,
              type: 'POINT',
              name: 'USE_POINT_1',
              createdAt: new Date(),
            },
            {
              checked: false,
              crud: 'd',
              no: 2,
              type: 'POINT',
              name: 'USE_POINT_2',
              createdAt: new Date(),
            },
            {
              checked: false,
              crud: 'u',
              no: 3,
              type: 'SYSTEM',
              name: 'SSE',
              createdAt: new Date(),
            },
            {
              checked: false,
              crud: 'c',
              no: 4,
              type: 'POINT',
              name: 'USE_POINT_4',
              createdAt: new Date(),
            },
          ]}
          fixedColumnIndex={0}
          className="mt-4"
        />
      </div>
    </PageSystemVariableLayout>
  )
}
