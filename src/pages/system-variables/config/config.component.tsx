import { QueryConstraint, startAfter, startAt } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import api from '~/apis/system-variables'
import { GridBody } from '~/components/grids/body'
import { Properties } from '~/components/grids/body/body.component'
import { GridCudButtons } from '~/components/grids/cud-buttons'
import { GridPaging } from '~/components/grids/paging'
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

const initSort: { column: keyof SystemVariableType; type: 'asc' | 'desc' } = {
  column: 'modifiedAt',
  type: 'desc',
}

export interface PageSystemVariableConfigProps {}

type ItemType = SystemVariableType & {
  crud: CRUD
  no: number
  check: boolean
  adminName?: string
}

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
  const [sort, setSort] =
    React.useState<{ column: keyof SystemVariableType; type: 'asc' | 'desc' }>(
      initSort,
    )
  const [orgList, setOrgList] = React.useState<GridData<ItemType>[]>([])
  const [list, setList] = React.useState<GridData<ItemType>[]>([])
  const [loading, setLoading] = React.useState(false)

  const adminList = Recoil.useRecoilValue(adminGlobalStates.adminListState)
  const me = Recoil.useRecoilValue(adminGlobalStates.adminState)

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

    const items: ItemType[] = []

    for (offset; offset < page * (pageCnt ?? list.length); offset += 1) {
      if (offset === list.length) {
        break
      }
      items.push(list[offset])
    }

    return items
  }, [list, searchInput.page, searchInput.pageCount])

  const onSearch = React.useCallback(
    async (
      inputSort?: {
        column: keyof SystemVariableType
        type: 'asc' | 'desc'
      },
      queryOffset?: QueryConstraint,
    ) => {
      if (inputSort) {
        if (inputSort.column === sort.column && inputSort.type === sort.type) {
          return
        }

        setSort(() => inputSort)
      }

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
        offset:
          queryOffset ??
          startAfter(moment('9999-12-31T00:00:00.000Z').toDate()),
        sort: inputSort ?? sort,
        filter,
      })

      setSearchInput((old) => ({ ...old, page: 1 }))

      const newList = result.map((item, idx) => ({
        ...item,
        check: false,
        crud: CRUD.READ,
        no: idx + 1 + Number(searchInput.pageCount) * (searchInput.page - 1),
        adminName: adminList.find((admin) => admin.key === item.adminKey)?.name,
      }))

      setOrgList(() => newList)
      setList(() => newList)

      setLoading(() => false)
    },
    [searchInput, sort],
  )

  React.useEffect(() => {
    onSearch()
  }, [])

  const onSave = React.useCallback(async () => {
    setLoading(() => true)

    await api.apiSaveSystemVariables(
      pageList.filter((item) => item.crud !== CRUD.READ),
    )

    onSearch()
  }, [pageList, onSearch])

  const onCancel = React.useCallback(() => {
    setList((oldList) =>
      oldList
        .filter((item) => item.crud !== CRUD.CREATE || !item.check)
        .map((item, idx) => {
          if (item.check) {
            const found = orgList.find((org) => org.key === item.key)
            if (found) {
              return { ...found, check: false, crud: CRUD.READ, no: idx + 1 }
            }

            return { ...item, check: false, crud: CRUD.READ, no: idx + 1 }
          }

          return { ...item, no: idx + 1 }
        }),
    )
  }, [orgList])

  const onAdd = React.useCallback(() => {
    if (!me) return

    setList((oldList) => [
      {
        no: 1,
        crud: CRUD.CREATE,
        check: false,
        adminKey: me.key,
        adminName: me.name,
        use: true,
      },
      ...oldList.map((item) => ({ ...item, no: item.no + 1 })),
    ])
  }, [me])

  const onDelete = React.useCallback(() => {
    setList((oldList) =>
      oldList
        .filter((item) => item.crud !== CRUD.CREATE || !item.check)
        .map((item) =>
          item.check ? { ...item, check: false, crud: CRUD.DELETE } : item,
        ),
    )
  }, [])

  const updateCrud = React.useCallback((crud: CRUD) => {
    if (crud === CRUD.READ) {
      return CRUD.MODIFY
    }

    return crud
  }, [])

  const constructQueryOffset = React.useCallback(
    (key: keyof SystemVariableType, type?: 'asc' | 'desc') => {
      switch (key) {
        case 'use':
          switch (type) {
            case 'asc':
              return startAt(false)
            case 'desc':
              return startAt(true)
            default:
              return startAfter(moment('9999-12-31T00:00:00.000Z').toDate())
          }
        case 'createdAt':
          if (type === 'asc') {
            return startAfter(moment('1000-01-01T00:00:00.000Z').toDate())
          }

          return startAfter(moment('9999-12-31T00:00:00.000Z').toDate())
        default:
          if (type === 'desc') {
            return startAfter(moment('9999-12-31T00:00:00.000Z').toDate())
          }

          return startAfter(moment('1000-01-01T00:00:00.000Z').toDate())
      }
    },
    [],
  )

  const onChange = React.useCallback(
    (idx: number, input: string | number | boolean, key: keyof ItemType) => {
      setList((oldList) =>
        oldList.map((item, index) =>
          index === idx
            ? { ...item, [key]: input, crud: updateCrud(item.crud) }
            : item,
        ),
      )
    },
    [updateCrud],
  )

  const properties = React.useMemo(
    () =>
      [
        {
          key: 'type',
          type: 'text',
          label: '유형',
          onChange: (idx: number, input: string) =>
            onChange(idx, input, 'type'),
          width: '15rem',
          justify: 'center',
        },
        {
          key: 'name',
          type: 'text',
          label: '변수명',
          onChange: (idx: number, input: string) =>
            onChange(idx, input, 'name'),
          width: '*',
          justify: 'start',
        },
        {
          key: 'value',
          type: 'text',
          label: '값',
          onChange: (idx: number, input: number) =>
            onChange(idx, input, 'value'),
          width: '7rem',
          justify: 'start',
        },
        {
          key: 'use',
          type: 'check',
          label: '사용여부',
          onChange: (idx: number, input: boolean) =>
            onChange(idx, input, 'use'),
          onSort: (type?: 'asc' | 'desc') =>
            onSearch(
              !type
                ? initSort
                : {
                    column: 'use',
                    type,
                  },
              constructQueryOffset('use', type),
            ),
          sort: sort.column === 'use' ? sort.type : undefined,
          width: '7rem',
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
          onSort: (type?: 'asc' | 'desc') =>
            onSearch(
              !type
                ? initSort
                : {
                    column: 'createdAt',
                    type,
                  },
              constructQueryOffset('createdAt', type),
            ),
          sort: sort.column === 'createdAt' ? sort.type : undefined,
          width: '14rem',
          justify: 'center',
          uneditable: true,
        },
        {
          key: 'modifiedAt',
          type: 'date',
          label: '수정일시',
          format: 'YYYY-MM-DD HH:mm:ss',
          onSort: (type?: 'asc' | 'desc') =>
            onSearch(
              {
                column: 'modifiedAt',
                type: type ?? 'asc',
              },
              constructQueryOffset('modifiedAt', type),
            ),
          sort: sort.column === 'modifiedAt' ? sort.type : undefined,
          width: '14rem',
          justify: 'center',
          uneditable: true,
        },
      ] as Properties[],
    [onSearch, constructQueryOffset, onChange],
  )

  const savable = React.useMemo(
    () =>
      pageList.some((item) => item.crud !== CRUD.READ) &&
      !pageList.some(
        (item) =>
          item.crud === CRUD.CREATE &&
          (!item.type || (item.value !== null && item.value !== undefined)),
      ),
    [pageList],
  )

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
          savable={savable}
          onSave={onSave}
          onCancel={onCancel}
          onAdd={onAdd}
          onDelete={onDelete}
          className="mt-10 mb-2"
        />
        <GridBody
          loading={loading}
          checkedAll={!pageList.some((item) => !item.check)}
          onCheck={(idx: number, newState: boolean) => {
            setList((oldList) =>
              oldList.map((item, index) =>
                index === idx ? { ...item, check: newState } : item,
              ),
            )
          }}
          onCheckAll={() => {
            const check = pageList.some((item) => !item.check)

            setList((oldList) =>
              oldList.map((item) => {
                const found = pageList.find(
                  (pageItem) => pageItem.no === item.no,
                )
                if (found) {
                  return { ...found, check }
                }

                return item
              }),
            )
          }}
          properties={properties}
          data={pageList}
          fixedColumnIndex={2}
          className="mt-4"
          height="calc(100% - 10.699rem)"
        />
        <GridPaging
          page={searchInput.page}
          totalPage={pageCount}
          onChange={(type) =>
            setSearchInput((old) => ({
              ...old,
              page: type === 'prev' ? old.page - 1 : old.page + 1,
            }))
          }
          className="self-center"
        />
      </div>
    </PageSystemVariableLayout>
  )
}
