import { startAfter, startAt } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import api from '~/apis/system-variable'
import { GridBody } from '~/components/grids/body'
import { Properties } from '~/components/grids/body/row/row.component'
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
import customHooks from '~/utils/hooks'
import PageSystemVariableStyle from '../layout.style'

const initSort: { column: keyof SystemVariableType; type: 'asc' | 'desc' } = {
  column: 'modifiedAt',
  type: 'desc',
}

export interface PageSystemVariableConfigProps {}

type ItemType = GridData<SystemVariableType>

export default function PageSystemVariableConfig({}: PageSystemVariableConfigProps) {
  const [searchInput, setSearchInput] = React.useState<{
    adminKey?: string | null
    type?: string | null
    use?: boolean | null
    createdAt?: null | {
      start?: Date
      end?: Date
    }
    modifiedAt?: null | {
      start?: Date
      end?: Date
    }
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
  const [orgList, setOrgList] = React.useState<ItemType[]>([])
  const [list, setList] = React.useState<ItemType[]>([])
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

  const { pageCount, pageList } = customHooks.useGridPageData(
    list,
    searchInput.page,
    searchInput.pageCount,
  )

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
          return startAfter(
            moment(
              type === 'asc'
                ? '1000-01-01T00:00:00.000Z'
                : '9999-12-31T00:00:00.000Z',
            ).toDate(),
          )
        default:
          return startAfter(
            moment(
              type === 'desc'
                ? '9999-12-31T00:00:00.000Z'
                : '1000-01-01T00:00:00.000Z',
            ).toDate(),
          )
      }
    },
    [],
  )

  const onSearch = React.useCallback(
    async (inputSort?: {
      column: keyof SystemVariableType
      type: 'asc' | 'desc'
    }) => {
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

      if (
        typeof searchInput.use === 'boolean' &&
        inputSort?.column !== 'use' &&
        sort.column !== 'use'
      ) {
        filter.push(['use', '==', searchInput.use])
      }

      if (
        searchInput.createdAt &&
        searchInput.createdAt.start &&
        searchInput.createdAt.end
      ) {
        filter.push(['createdAt', '>=', searchInput.createdAt.start])
        filter.push(['createdAt', '<=', searchInput.createdAt.end])
      }

      if (
        searchInput.modifiedAt &&
        searchInput.modifiedAt.start &&
        searchInput.modifiedAt.end
      ) {
        filter.push(['modifiedAt', '>=', searchInput.modifiedAt.start])
        filter.push(['modifiedAt', '<=', searchInput.modifiedAt.end])
      }

      const result = await api.apiGetSystemVariables({
        limit: searchInput.pageCount ?? 10000,
        offset: inputSort
          ? constructQueryOffset(inputSort.column, inputSort.type)
          : constructQueryOffset(sort.column, sort.type),
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
    [searchInput, sort, adminList, constructQueryOffset],
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

  const { onCancel, onDelete } = customHooks.useGridCancelDelete(
    setList,
    orgList,
  )

  const onAdd = React.useCallback(() => {
    if (!me) return

    setList((oldList) => [
      {
        no: 1,
        crud: CRUD.CREATE,
        check: true,
        adminKey: me.key,
        adminName: me.name,
        use: true,
      },
      ...oldList.map((item) => ({ ...item, no: item.no + 1 })),
    ])
  }, [me])

  const updateCrud = React.useCallback((crud: CRUD) => {
    if (crud === CRUD.READ) {
      return CRUD.MODIFY
    }

    return crud
  }, [])

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
          justify: 'end',
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
            ),
          sort: sort.column === 'use' ? sort.type : undefined,
          sortable: true,
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
            ),
          sort: sort.column === 'createdAt' ? sort.type : undefined,
          sortable: true,
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
            onSearch({
              column: 'modifiedAt',
              type: type ?? 'asc',
            }),
          sort: sort.column === 'modifiedAt' ? sort.type : undefined,
          sortable: true,
          width: '14rem',
          justify: 'center',
          uneditable: true,
        },
      ] as Properties[],
    [onSearch, onChange],
  )

  const savable = React.useMemo(
    () =>
      pageList.some((item) => item.crud !== CRUD.READ) &&
      !pageList.some(
        (item) =>
          item.crud === CRUD.CREATE &&
          (!item.type || item.value === null || item.value === undefined),
      ),
    [pageList],
  )

  const modifiable = React.useMemo(
    () => pageList.some((item) => item.check),
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
              type: 'date',
              label: '생성일시',
              onSelect: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setSearchInput((old) => ({
                    ...old,
                    modifiedAt: undefined,
                    createdAt: {
                      start: value[0] as undefined | Date,
                      end: value[1] as undefined | Date,
                    },
                  }))
                  setSort((old) =>
                    old.column === 'createdAt'
                      ? old
                      : { column: 'createdAt', type: 'asc' },
                  )
                }
              },
              value: searchInput.createdAt
                ? ([searchInput.createdAt.start, searchInput.createdAt.end] as [
                    Date | undefined,
                    Date | undefined,
                  ])
                : undefined,
              width: '20rem',
            },
            {
              type: 'date',
              label: '수정일시',
              onSelect: (value) => {
                if (Array.isArray(value) && value.length > 1) {
                  setSearchInput((old) => ({
                    ...old,
                    createdAt: undefined,
                    modifiedAt: {
                      start: value[0] as undefined | Date,
                      end: value[1] as undefined | Date,
                    },
                  }))
                  setSort((old) =>
                    old.column === 'modifiedAt'
                      ? old
                      : { column: 'modifiedAt', type: 'asc' },
                  )
                }
              },
              value: searchInput.modifiedAt
                ? ([
                    searchInput.modifiedAt.start,
                    searchInput.modifiedAt.end,
                  ] as [Date | undefined, Date | undefined])
                : undefined,
              width: '20rem',
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
          className={PageSystemVariableStyle.gridTopSearchClassName}
        />
        <GridCudButtons
          modifiable={modifiable}
          savable={savable}
          onSave={onSave}
          onCancel={onCancel}
          onAdd={onAdd}
          onDelete={onDelete}
          className={PageSystemVariableStyle.gridCudButtonsClassName}
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
          {...PageSystemVariableStyle.gridBody}
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
          className={PageSystemVariableStyle.gridPagingClassName}
        />
      </div>
    </PageSystemVariableLayout>
  )
}
