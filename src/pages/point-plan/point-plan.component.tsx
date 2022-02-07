import { startAt } from 'firebase/firestore'
import React from 'react'
import Recoil from 'recoil'
import api from '~/apis/charm-plan'
import { GridBody } from '~/components/grids/body'
import { Properties } from '~/components/grids/body/row/row.component'
import { GridCudButtons } from '~/components/grids/cud-buttons'
import { CRUD } from '~/enums'
import { CharmPlanType } from '~/models/charm-plan'
import adminGlobalStates from '~/states/admin'
import { GridData } from '~/types'
import customHooks from '~/utils/hooks'
import PagePointPlanLayout from './layout.component'
import PagePointPlanStyle from './layout.style'

export interface PagePointPlanProps {}

type ItemType = GridData<CharmPlanType>

export default function PagePointPlan({}: PagePointPlanProps) {
  const [orgList, setOrgList] = React.useState<ItemType[]>([])
  const [list, setList] = React.useState<ItemType[]>([])
  const [loading, setLoading] = React.useState(false)

  const adminList = Recoil.useRecoilValue(adminGlobalStates.adminListState)
  const me = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const onSearch = React.useCallback(async () => {
    setLoading(() => true)

    const result = await api.apiGetCharmPlans({
      limit: 10000,
      offset: startAt(0),
      sort: {
        column: 'order',
        type: 'asc',
      },
    })

    const newList = result.map((item, idx) => ({
      ...item,
      check: false,
      crud: CRUD.READ,
      no: idx + 1,
      adminName: adminList.find((admin) => admin.key === item.adminKey)?.name,
    }))

    setOrgList(() => newList)
    setList(() => newList)

    setLoading(() => false)
  }, [adminList])

  React.useEffect(() => {
    onSearch()
  }, [])

  const onSave = React.useCallback(async () => {
    setLoading(() => true)

    await api.apiSaveCharmPlans(list.filter((item) => item.crud !== CRUD.READ))

    onSearch()
  }, [list, onSearch])

  const { onDelete } = customHooks.useGridCancelDelete(setList, orgList)

  const onAdd = React.useCallback(() => {
    if (!me) return

    setList((oldList) => [
      {
        no: 1,
        crud: CRUD.CREATE,
        check: true,
        adminKey: me.key,
        adminName: me.name,
        purchaseCount: 0,
        order: oldList.length,
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
          width: '*',
          justify: 'center',
        },
        {
          key: 'charm',
          type: 'number',
          label: '포인트',
          onChange: (idx: number, input: number) =>
            onChange(idx, input, 'charm'),
          width: '6rem',
          justify: 'end',
        },
        {
          key: 'dollar',
          type: 'dollar',
          label: '가격',
          onChange: (idx: number, input: string) =>
            onChange(idx, input, 'dollar'),
          width: '10rem',
          justify: 'end',
        },
        {
          key: 'purchaseCount',
          type: 'number',
          label: '구매횟수',
          width: '10rem',
          justify: 'end',
          uneditable: true,
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
          width: '14rem',
          justify: 'center',
          uneditable: true,
        },
        {
          key: 'modifiedAt',
          type: 'date',
          label: '수정일시',
          format: 'YYYY-MM-DD HH:mm:ss',
          width: '14rem',
          justify: 'center',
          uneditable: true,
        },
        {
          key: 'order',
          type: 'number',
          label: '노출순서',
          width: '10rem',
          justify: 'end',
          uneditable: true,
        },
      ] as Properties[],
    [onSearch, onChange],
  )

  const savable = React.useMemo(
    () =>
      list.some((item) => item.crud !== CRUD.READ) &&
      !list.some(
        (item) =>
          item.crud === CRUD.CREATE &&
          (typeof item.charm !== 'number' ||
            !item.type ||
            !item.dollar ||
            !item.dollar.includes('.')),
      ),
    [list],
  )

  const modifiable = React.useMemo(
    () => list.some((item) => item.check),
    [list],
  )

  const onDrag = React.useCallback(
    (oldIdx: number, newIdx: number) => {
      setList((oldList) =>
        [
          ...oldList
            .filter((item) => item.order === oldIdx)
            .map((item) => ({
              ...item,
              no: newIdx + 1,
              order: newIdx,
              crud: updateCrud(item.crud),
            })),
          ...oldList
            .filter((item) => item.order === newIdx)
            .map((item) => ({
              ...item,
              no: oldIdx + 1,
              order: oldIdx,
              crud: updateCrud(item.crud),
            })),
          ...oldList.filter(
            (item) => item.order !== oldIdx && item.order !== newIdx,
          ),
        ].sort((a, b) => Number(a.order) - Number(b.order)),
      )
    },
    [updateCrud],
  )

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
        })
        .sort((a, b) => Number(a.order) - Number(b.order)),
    )
  }, [orgList])

  return (
    <PagePointPlanLayout>
      <div {...PagePointPlanStyle.layout}>
        <GridCudButtons
          modifiable={modifiable}
          savable={savable}
          onSave={onSave}
          onCancel={onCancel}
          onAdd={onAdd}
          onDelete={onDelete}
          className={PagePointPlanStyle.gridCudButtonsClassName}
        />
        <GridBody
          loading={loading}
          checkedAll={!list.some((item) => !item.check)}
          onCheck={(idx: number, newState: boolean) => {
            setList((oldList) =>
              oldList.map((item, index) =>
                index === idx ? { ...item, check: newState } : item,
              ),
            )
          }}
          onCheckAll={() => {
            const check = list.some((item) => !item.check)

            setList((oldList) =>
              oldList.map((item) => {
                const found = list.find((pageItem) => pageItem.no === item.no)
                if (found) {
                  return { ...found, check }
                }

                return item
              }),
            )
          }}
          properties={properties}
          data={list}
          fixedColumnIndex={4}
          onDrag={onDrag}
          {...PagePointPlanStyle.gridBody}
        />
      </div>
    </PagePointPlanLayout>
  )
}
