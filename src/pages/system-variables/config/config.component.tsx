import { startAfter } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import api from '~/apis/system-variables'
import { GridBody } from '~/components/grids/body'
import { GridCudButtons } from '~/components/grids/cud-buttons'
import { GridTopSearch } from '~/components/grids/top-search'
import { CRUD } from '~/enums'
import {
  SystemVariableFilterType,
  SystemVariableType,
} from '~/models/system-variable'
import PageSystemVariableLayout from '~/pages/system-variables/layout.component'
import adminGlobalStates from '~/states/admin'
import { GridData } from '~/types'
import { WhereFilterType } from '~/types/firestore'
import PageSystemVariableStyle from '../layout.style'

export interface PageSystemVariableConfigProps {}

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  const [searchInput, setSearchInput] = React.useState<{
    adminKey?: string | null
    type?: string | null
    use?: boolean | null
    page: number
    pageCount?: number | null
  }>({ page: 1, pageCount: 10 })
  const [options, setOptions] = React.useState<
    Array<{ label: string; value: string }>
  >([])
  const [list, setList] = React.useState<
    GridData<SystemVariableType & { adminName?: string }>[]
  >([])
  const [loading, setLoading] = React.useState(false)

  const adminList = Recoil.useRecoilValue(adminGlobalStates.adminListState)

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
      setLoading(() => true)

      const filter: WhereFilterType<SystemVariableFilterType>[] = []

      if (typeof searchInput.type === 'string') {
        filter.push(['type', '==', searchInput.type])
      }

      if (typeof searchInput.adminKey === 'string') {
        filter.push(['adminKey', '==', searchInput.adminKey])
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

      setList(() =>
        result.map((item, idx) => ({
          ...item,
          check: false,
          crud: CRUD.READ,
          no: idx + 1 + Number(searchInput.pageCount) * (searchInput.page - 1),
          adminName: adminList.find((admin) => admin.key === item.adminKey)
            ?.name,
        })),
      )

      setLoading(() => false)
    },
    [searchInput],
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
          onSearch={onSearch}
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
              type: 'single-select',
              label: '최종 수정자',
              onSelect: (value) =>
                setSearchInput((old) => ({
                  ...old,
                  adminKey: value as null | undefined | string,
                })),
              options: adminList.map((admin) => ({
                value: admin.key,
                label: admin.name ?? admin.email,
              })),
              value: searchInput.adminKey,
              placeholder: '전체',
              width: '15rem',
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
          className="z-20"
        />
        <GridCudButtons
          onSave={onSave}
          onCancel={onCancel}
          onAdd={onAdd}
          onDelete={onDelete}
          className="mt-10 mb-2"
        />
        <GridBody
          loading={loading}
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
              options,
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
              key: 'value',
              type: 'text',
              label: '값',
              onChange: (input: number) => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 201 ~ PageSystemVariableConfig ~ input',
                  input,
                )
              },
              width: '8rem',
              justify: 'start',
            },
            {
              key: 'use',
              type: 'check',
              label: '사용여부',
              onChange: (input: boolean) => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 201 ~ PageSystemVariableConfig ~ input',
                  input,
                )
              },
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
            {
              key: 'adminName',
              type: 'text',
              label: '최종 수정자',
              width: '8rem',
              justify: 'center',
              uneditable: true,
            },
            {
              key: 'createdAt',
              type: 'date',
              label: '생성일시',
              format: 'YYYY-MM-DD HH:mm:ss',
              onSort: (sort?: 'asc' | 'desc') => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 237 ~ PageSystemVariableConfig ~ sort',
                  sort,
                )
              },
              sort: 'asc',
              width: '8rem',
              justify: 'center',
              uneditable: true,
            },
            {
              key: 'modifiedAt',
              type: 'date',
              label: '수정일시',
              format: 'YYYY-MM-DD HH:mm:ss',
              onSort: (sort?: 'asc' | 'desc') => {
                console.log(
                  '🚀 ~ file: config.component.tsx ~ line 237 ~ PageSystemVariableConfig ~ sort',
                  sort,
                )
              },
              sort: 'asc',
              width: '8rem',
              justify: 'center',
              uneditable: true,
            },
          ]}
          data={pageList}
          fixedColumnIndex={0}
          className="mt-4"
          height="calc(100% - 10.699rem)"
        />
      </div>
    </PageSystemVariableLayout>
  )
}
